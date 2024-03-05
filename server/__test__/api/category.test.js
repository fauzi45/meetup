const Request = require("supertest");
const QS = require("qs");
const _ = require("lodash");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const CategoryPlugin = require("../../server/api/category");
const MockBlogWithAssocList = require("../fixtures/database/category.json");

let apiUrl;
let server;
let query;
let mockBlogWithAssocList;
let getCategoryList;
let bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaW1hZ2VfdXJsIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9keHNhcWRpeTcvaW1hZ2UvdXBsb2FkL3YxNzA5NTE4NjMxL2ltYWdlL3Z6NG82aDh5NXhtZXFmcmNlb2h4LmpwZyIsImlhdCI6MTcwOTYxNDU3NCwiZXhwIjoxNzA5NzAwOTc0fQ.eHNfWL0o-ejXKTDIuXtOPBGoVtuEBX5l9LUPjaRCvQY";

describe("Category", () => {
  beforeAll(() => {
    server = GeneralHelper.createTestServer("/api/category", CategoryPlugin);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("List", () => {
    beforeEach(() => {
      apiUrl = "/api/category/admin/list";

      mockBlogWithAssocList = _.cloneDeep(MockBlogWithAssocList);

      getCategoryList = jest.spyOn(db.Category, "findAll");
    });

    test("Should Return 200: Get Category List", async () => {
      getCategoryList.mockResolvedValue(mockBlogWithAssocList);
      await Request(server)
        .get(apiUrl)
        .set("Authorization", bearerToken)
        .expect(200);
      expect(res.body).toBeTruthy();
    });
 
    test("Should Return 200: Get Blog List without Query Param", async () => {
      getCategoryList.mockResolvedValue(mockBlogWithAssocList);

      await Request(server)
        .get(apiUrl)
        .expect(200)
        .then((res) => {
          expect(!_.isEmpty(res.body)).toBeTruthy();
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    test("Should Return 500: Something Went Wrong with Database", async () => {
      getCategoryList.mockRejectedValue("Something Went Wrong");
      await Request(server).get(apiUrl).expect(500);
    });
  });
});
