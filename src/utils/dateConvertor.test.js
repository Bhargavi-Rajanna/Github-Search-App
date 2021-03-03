import { dateConvertor } from "./dateConvertor";

describe("date conversion function", () => {
  describe("dateConvertor", () => {
    it("should return the new date string in the format : Day Month date Year mm/dd/yyyy, hh:mm:ss AM", () => {
      const date = "2021-02-03T14:33:01Z";
      const convertedDate = dateConvertor(date);

      expect(convertedDate).toBe("Wed Feb 03 2021 2/3/2021, 6:33:01 PM");
    });
  });
});
