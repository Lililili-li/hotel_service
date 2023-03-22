var mysql = require('mysql');

/*
 * 创建连接池。
 */
var create = function(config) {
    var pool  = mysql.createPool({
        connectionLimit: 200,
        acquireTimeout: 30000,
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
    });
    return pool;
};

exports.create = create;

var dbClient = function(pool){
	/*
	* 条件获取的方法。
	*/
	function getCnd(cnd, args, cb){
	    if(arguments.length > 3) return null;
	    if(arguments.length == 1){
	        return {where : " where 1 = 1 ", args : [], cb : arguments[0]}
	    }else if(arguments.length == 2){
	        var info = {args : [], cb : args};
	        args = cnd;
	        cnd = " where 1 = 1 ";
	        if(args){
	            for (var key in args) {
	                if(!key || key == "_orderBy" || typeof args[key] == "function") continue;
	                cnd += " and " + key + " = ? ";
	                info.args.push(args[key]);
	            }
	            var orderByArr = args._orderBy;
	            if(orderByArr && orderByArr.length > 0){
	                cnd += " order by "
	                for (var i = 0, li = orderByArr.length; i < li; i++) {
	                    cnd += " " + orderByArr[i] + " ";
	                    if(i < li -1) cnd += ","
	                }
	            }
	        }
	        info.where = cnd;
	        return info;
	    }
	    cnd = cnd || "";
	    if(cnd.trim() != "" && cnd.search(/^[\s]*where[\s]/) != 0){
	        cnd = " where " + cnd
	    }
	    return {where : cnd, args : args, cb : cb};
	};
	/*
	 * 请求执行。
	 */
	function query(sql, args, cb){
			var arr = Array.prototype.slice.apply(arguments);
			var cb = arr.pop();
			pool.getConnection(function(err, connection) {
					if(err) return cb(err);
					arr.push(function(err, results){
							connection.release();
							err ? cb(err) : cb(null, results);
					});
					connection.query.apply(connection, arr);
			});
	};

	/*
	 * 获取单条数据操作。
	 */
	function select(tableName, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 1));
	    var strSql = "select * from " + tableName + cnd.where +" limit 1";
	    this.query(strSql, cnd.args, function (err, result) {
	        err ? cnd.cb(err, null) : cnd.cb(null, result.length > 0 ? result[0] : null);
	    });
	};

	/*
	 * 获取单条某些列数据操作。
	 */
	function selectCols(tableName, cols, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 2));
	    var strCols = cols instanceof Array ? cols.join(",") : cols;
	    var strSql = "select "+strCols+" from " + tableName + cnd.where +" limit 1";
	    this.query(strSql, cnd.args, function (err, result) {
	        err ? cnd.cb(err, null) : cnd.cb(null, result.length > 0 ? result[0] : null);
	    });
	};

	/*
	 * 获取多条数据操作。
	 */
	function list(tableName, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 1));
	    var strSql = "select * from	" + tableName + cnd.where;
	    this.query(strSql, cnd.args, cnd.cb);
	};

	/*
	 * 获取多条某些列数据操作。
	 */
	function listCols(tableName,cols, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 2));
	    var strCols = cols instanceof Array ? cols.join(",") : cols;
	    var strSql = "select "+strCols+" from " + tableName + cnd.where;
	    this.query(strSql, cnd.args, cnd.cb);
	};

	/*
	 * 插入单条数据操作。
	 */
	function insert(tableName, args, cb){
	    var sqlStr = "insert into " + tableName + " set ? ";
	    this.query(sqlStr, args, cb);
	};

	/*
	 * 批量插入
	 */
	function insertList(tableName, entity, entityList, cb){
	    if(entityList.length<=0) return cb(null);
	    var strCols = '';
	    entity.forEach(function(value){
	    	if (value.toString() == "id") return;
	        strCols += "" + value + ",";
	    })
	    strCols = strCols.substr(0,strCols.length-1);
	    var values = "";
	    for (var i = 0; i < entityList.length; i++) {
	        var locEntity = entityList[i];
	        values+="(";
	        for (var key in locEntity) {
	            if (key.toString() == "id") continue;
	            var locValue = locEntity[key];
	            if(locValue==null){
	                values += "NULL,";
	            }else{
	                if(locValue  instanceof Date){
	                    locValue = locValue.toFormat("YYYY-MM-DD HH24:MI:SS");
	                }
	                if(typeof locValue == "object"){
	                    locValue = JSON.stringify(locValue);
	                }
	                values += "" + mysql.escape(locValue)  + ",";
	            }

	        }
	        values = values.substr(0,values.length-1);
	        values+="),";
	    }
	    values = values.substr(0,values.length-1);
	    var sqlStr = "insert into "+tableName+" ("+strCols+") values "+values+" ";
	    // console.log(sqlStr);
	    this.query(sqlStr, [],  cb);
	};

	/*
	 * 更新数据操作。
	 */
	function update(tableName, values, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 2));
	    var cols = "";
	    var tempArr = [];
	    if(typeof values == "string"){
	        cols = values;
	    }else{
	        for (var key in values) {
	            if(!key || typeof values[key] == "function") continue;
	            cols += key + " = ?,"
	            tempArr.push(values[key]);
	        }
	        cols = cols.substring(0, cols.length - 1);//去除最有一个逗号
	    }

	    var sqlStr = "update " + tableName + " set " + cols + cnd.where;
	    this.query(sqlStr, tempArr.concat(cnd.args), cnd.cb);
	};

	/*
	 * 根据条件计算数量
	 */
	function count(tableName, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 1));
	    var strSql = "select count(1) as count from " + tableName + cnd.where +" limit 1";
	    this.query(strSql, cnd.args, function (err, result) {
	        err ? cnd.cb(err, null) : cnd.cb(null, result.length > 0 ? result[0].count : 0);
	    });
	};

	/*
	 * 删除数据操作。
	 */
	function del(tableName, cnd, args, cb){
	    var cnd = getCnd.apply(this, Array.prototype.slice.call(arguments, 1));
	    var sql = "delete from " + tableName + cnd.where;
	    this.query(sql, cnd.args || [], cnd.cb);
	};


	this.query = query;
	this.select = select;
	this.selectCols = selectCols;
	this.list = list;
	this.listCols = listCols;
	this.insert = insert;
	this.insertList = insertList;
	this.update = update;
	this.count = count;
	this.del = del;
}

exports.dbClient = dbClient;