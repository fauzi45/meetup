const Request = require("supertest");
const QS = require("qs");
const _ = require("lodash");

const db = require("../../models");
const GeneralHelper = require("../../server/helpers/generalHelper");
const CategoryPlugin = require("../../server/api/category");
const MockBlogWithAssocList = require("../fixtures/database/category.json");
const DetailCategory = require("../fixtures/database/detailcategory.json");

let apiUrl;
let server;
let query;
let mockBlogWithAssocList;
let getCategoryList;
let bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaW1hZ2VfdXJsIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9keHNhcWRpeTcvaW1hZ2UvdXBsb2FkL3YxNzA5NTE4NjMxL2ltYWdlL3Z6NG82aDh5NXhtZXFmcmNlb2h4LmpwZyIsImlhdCI6MTcwOTcwMzgzOSwiZXhwIjoxNzA5NzkwMjM5fQ.XPlI85h-hy6k5JuBJgzghPyd1k5ea1orrsny0u3Byao";

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
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 200: The Category is empty", async () => {
      getCategoryList.mockResolvedValue();
      await Request(server)
        .get(apiUrl)
        .set("Authorization", bearerToken)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 401: Unauthorized", async () => {
      await Request(server).get(apiUrl).expect(401);
    });
  });

  describe("Detail", () => {
    beforeEach(() => {
      apiUrl = "/api/category/admin/detail";
      mockBlogWithAssocList = _.cloneDeep(DetailCategory);
      getCategoryList = jest.spyOn(db.Category, "findOne");
    });

    test("Should Return 200: Get Category List", async () => {
      getCategoryList.mockResolvedValue(mockBlogWithAssocList);
      await Request(server)
        .get(`${apiUrl}/1`)
        .set("Authorization", bearerToken)
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });

    test("Should Return 404: Get Category List id missing", async () => {
      getCategoryList.mockResolvedValue({});
      await Request(server)
        .get(`${apiUrl}/100`)
        .set("Authorization", bearerToken)
        .expect(404)
        .then((res) => {
          console.log(res.body, "<>>>>");
        });
    });
  });
});
