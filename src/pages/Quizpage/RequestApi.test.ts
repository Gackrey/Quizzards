import { RequestApi } from "./RequestApi";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Testing quiz api", () => {

  test("Site is live", async () => {
    const data = await RequestApi("");
    expect(data).toEqual({ errorMessage: "Landing page of API fetched" });
  });

  test("Quiz data request test", async () => {
    const serverData = {
      data: {
        questionlist: [
          {
            question: "Who is the first Indian to score a hundred in the IPL? ",
            options: [
              "Paul Valthaty",
              "Manish Pandey",
              "Gautam Gambhir",
              "Virender Sehwag"
            ],
            answer: 2
          }
        ]
      }
    }
    mockedAxios.get.mockResolvedValue(serverData);
    const data = await RequestApi("ipl");
    expect(data).toEqual({
      questionlist: [
        {
          question: "Who is the first Indian to score a hundred in the IPL? ",
          options: [
            "Paul Valthaty",
            "Manish Pandey",
            "Gautam Gambhir",
            "Virender Sehwag"
          ],
          answer: 2
        }
      ]
    });
  });
  test("should return errorMessage when API is call fails", async () => {
    mockedAxios.get.mockRejectedValue({ response: { data: { errorMessage: "user not found"}}});

    mockedAxios.isAxiosError.mockImplementation((payload) => true)
        const user = await RequestApi('sfsfs');
        expect(user).toEqual({ errorMessage: "user not found" });
  })
});
