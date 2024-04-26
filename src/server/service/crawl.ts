import { crawl } from "../../crawl"
import { ACCESS_TOKEN } from "../../env";
import { logError } from "../../helpers/page.helper";
import { pool } from "../../server";

export const crawlService = async () => {

  const connection = await pool.getConnection()
  await crawl({
      ACCESS_TOKEN: ACCESS_TOKEN,
      SEARCH_KEYWORDS: `(from:RFA_Chinese OR from:lidangzzz)`,
      // TWEET_THREAD_URL: "https://twitter.com/pangeransiahaan/status/1690590234009112576",
      TARGET_TWEET_COUNT: 100,
      OUTPUT_FILENAME: "gibran.csv",
      DELAY_EACH_TWEET_SECONDS: 3,
      DELAY_EVERY_100_TWEETS_SECONDS: 20,
      SEARCH_TAB: "LATEST",
      CSV_INSERT_MODE: "REPLACE",
      SEARCH_FROM_DATE: "18-04-2024",
      SEARCH_TO_DATE: "19-04-2024",
      retCallback: async (res) => {

          for (const item of res) {
              try {
                await connection.query('INSERT INTO tweets SET ?', item);
              } catch (error) {
                logError("Error inserting item:" + item + "Error:"+ error);
              }
            }
      }
    });

    return {message: "started"}
}

