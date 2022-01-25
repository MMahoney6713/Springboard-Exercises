"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate, sqlGetAllJobQuery } = require("../helpers/sql");

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
   * 
   * findAll can be run with filters for jobs:
   *  title: filter by job title. Case-insensitive, matches-any-part-of-string search.
   *  minSalary: filter to jobs with at least that salary.
   *  hasEquity: if true, filter to jobs that provide a non-zero amount of equity. 
   *    If false or not included in the filtering, list all jobs regardless of equity.
   * 
   * */

  static async findAll(title = '', minSalary = 0, hasEquity = false) {

    const sqlWhereStatements = sqlGetAllJobQuery(title, minSalary, hasEquity);

    const jobsRes = await db.query(
      `SELECT id, 
              title,
              salary,
              equity,
              company_handle
      FROM jobs 
      ${sqlWhereStatements}
      ORDER BY title`);
    return jobsRes.rows;
  }

  /** Given a Job title, return data about Job.
   *
   * Returns { id, title, salary, equity, JobHandle }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(jobID) {
    const JobRes = await db.query(
      `SELECT id, 
              title,
              salary,
              equity,
              company_handle
      FROM jobs
      WHERE id = $1`,
      [jobID]);

    const Job = JobRes.rows[0];

    if (!Job) throw new NotFoundError(`No Job with ID of ${jobID}`);

    return Job;
  }

  /** Update Job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns { id, title, salary, equity, JobHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(jobID, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {});
    const jobIDVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${jobIDVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity, 
                                company_handle`;
    const result = await db.query(querySql, [...values, jobID]);
    const Job = result.rows[0];

    if (!Job) throw new NotFoundError(`No Job with ID of ${jobID}`);

    return Job;
  }

  /** Delete given Job from database; returns undefined.
   *
   * Throws NotFoundError if Job not found.
   **/

  static async remove(jobID) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [jobID]);
    const Job = result.rows[0];

    if (!Job) throw new NotFoundError(`No Job: ${jobID}`);
  }
}


module.exports = Job;
