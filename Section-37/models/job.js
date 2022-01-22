"use strict";

const { max } = require("pg/lib/defaults");
const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate, sqlGetAllQuery } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a Job (from data), update db, return new Job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   * */

  static async create({ title, salary, equity, company_handle }) {
    
    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle`,
        [title, salary, equity, company_handle],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */

  static async findAll(name = '', minEmployees = null, maxEmployees = null) {

    const sqlWhereStatements = sqlGetAllQuery(name, minEmployees, maxEmployees);

    const jobsRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM jobs 
           ${sqlWhereStatements}
           ORDER BY name`);
    return jobsRes.rows;
  }

  /** Given a Job handle, return data about Job.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, JobHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const JobRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM jobs
           WHERE handle = $1`,
        [handle]);

    const Job = JobRes.rows[0];

    if (!Job) throw new NotFoundError(`No Job: ${handle}`);

    return Job;
  }

  /** Update Job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const Job = result.rows[0];

    if (!Job) throw new NotFoundError(`No Job: ${handle}`);

    return Job;
  }

  /** Delete given Job from database; returns undefined.
   *
   * Throws NotFoundError if Job not found.
   **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE handle = $1
           RETURNING handle`,
        [handle]);
    const Job = result.rows[0];

    if (!Job) throw new NotFoundError(`No Job: ${handle}`);
  }
}


module.exports = Job;
