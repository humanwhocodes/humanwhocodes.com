"use strict";

import dotenv from "dotenv";
import fs from "fs";
import { graphql } from "@octokit/graphql";
// require("dotenv").config();
// const fs = require("fs");
// const { graphql } = require("@octokit/graphql");

dotenv.config();

const query = `
query{
    user(login: "nzakas") {
      sponsorsListing {
        tiers(first: 100) {
          nodes {
            name
            monthlyPriceInDollars
            adminInfo {
              sponsorships(first: 100, includePrivate: true) {
                nodes {
                  privacyLevel
                  sponsor: sponsorEntity {
                    ...on User {
                      name
                      avatarUrl
                      login
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`.trim();

(async () => {

    let cursor = null;
    let hasNextPage = false;
    const sponsors = [];

    const { user: { sponsorsListing: { tiers: { nodes: tiers }} } } = await graphql(query, {
        headers: {
          authorization: `token ${process.env.FETCH_SPONSORS_TOKEN}`
        },
        cursor
    });

    tiers.forEach(tier => {
        const tierSponsors = tier.adminInfo.sponsorships.nodes;

        tierSponsors.forEach(({ privacyLevel, sponsor }) => {

            if (privacyLevel === "PRIVATE") {
                sponsor = {
                    ...sponsor,
                    name: "(private donor)",
                    avatarUrl: "https://avatars1.githubusercontent.com/u/38546?s=120&v=4",
                    url: ""
                }
            }

            if (!sponsor.name) {
                sponsor.name = sponsor.login;
            }

            sponsors.push({
                amount: tier.monthlyPriceInDollars,
                source: "github",
                ...sponsor
            })
        });
    });
    
    fs.writeFileSync("./src/data/sponsors.json", JSON.stringify(sponsors, null, 4), "utf8");
    console.log("Wrote ./src/data/sponsors.json");
})();
