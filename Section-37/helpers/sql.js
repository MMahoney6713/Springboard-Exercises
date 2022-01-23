const { BadRequestError, ExpressError} = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  /** Returns the column names and corresponding values for the sql SET query. 'dataToUpdate' is passed in
   *  as the data received from the request, containing the key/value pairs for updating the object in the
   *  database. 'jsToSql' then is an object used to map the variable names from the javascript camel casing
   *  to the sql column name convention.   
   * 
   *  As an example, the following 'dataToUpdate' would be matched with a 'jsToSql' object which translates 
   *  firstName to first_name, and the result of the function would return the following: 
   * 
   *  dataToUpdate = {firstName: 'Aliya', age: 32};
   *  jsToSql1 = {firstName: 'first_name'};
   * 
   *  ==>  {"setCols": "\"first_name\"=$1, \"age\"=$2", "values": ["Aliya", 32]}
   */

  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

function sqlGetAllCompanyQuery(name, minEmployees, maxEmployees) {
  /** Generates a sql query 'where' statement containing any requested query information for
   *  name, minEmpoyees, or maxEmployees. The result with a query string containing all three 
   *  parameters:
   * 
   *  WHERE name iLIKE '%name%' AND numEmployees >= minEmployees AND numEmployees <= maxEmployees
   * 
   *  If the minEmployees is greater than the maxEmployees, returns an error message.
   */
  
  if (minEmployees > maxEmployees && maxEmployees !== null) {
    throw new ExpressError("Min Employees cannot be greater than Max Employees", 400)
  }
  let sqlWhereStatements = '';
  let sqlWhereStatementsArray = [];
  
  if (name) { sqlWhereStatementsArray.push(`name iLIKE '%${name}%'`) }
  if (minEmployees) { sqlWhereStatementsArray.push(`num_employees >= ${minEmployees}`) }
  if (maxEmployees) { sqlWhereStatementsArray.push(`num_employees <= ${maxEmployees}`) }

  if (name || minEmployees || maxEmployees) {
    sqlWhereStatements = 'WHERE ' + sqlWhereStatementsArray.join(' AND ');
  }
  
  return sqlWhereStatements;
}



function sqlGetAllJobQuery(name, minEmployees, maxEmployees) {
  /** Generates a sql query 'where' statement containing any requested query information for
   *  name, minEmpoyees, or maxEmployees. The result with a query string containing all three 
   *  parameters:
   * 
   *  WHERE name iLIKE '%name%' AND numEmployees >= minEmployees AND numEmployees <= maxEmployees
   * 
   *  If the minEmployees is greater than the maxEmployees, returns an error message.
   */
  
  if (minEmployees > maxEmployees && maxEmployees !== null) {
    throw new ExpressError("Min Employees cannot be greater than Max Employees", 400)
  }
  let sqlWhereStatements = '';
  let sqlWhereStatementsArray = [];
  
  if (name) { sqlWhereStatementsArray.push(`name iLIKE '%${name}%'`) }
  if (minEmployees) { sqlWhereStatementsArray.push(`num_employees >= ${minEmployees}`) }
  if (maxEmployees) { sqlWhereStatementsArray.push(`num_employees <= ${maxEmployees}`) }

  if (name || minEmployees || maxEmployees) {
    sqlWhereStatements = 'WHERE ' + sqlWhereStatementsArray.join(' AND ');
  }
  
  return sqlWhereStatements;
}

module.exports = { sqlForPartialUpdate, sqlGetAllCompanyQuery, sqlGetAllJobQuery};
