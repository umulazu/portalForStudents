import { isStarted, getCurrentDayInfo } from "../../client/rootSelectors";

describe("isStarted selector", () => {
   it("should return true if start timestamp exists and is not finished", () => {
      const state ={
         buttonPanel: {
            currentDay: {
               timestamps: [
                  {
                     startTime: "10:00"
                  }
               ]
            }
         }
      };
      const result = isStarted(state);
      expect(result).toBe(true);
   });

   it("should return false if start timestamp exists and is finished", () => {
      const state ={
         buttonPanel: {
            currentDay: {
               timestamps: [
                  {
                     startTime: "10:00",
                     finishTime: "12:00"
                  }
               ]
            }
         }
      };
      const result = isStarted(state);
      expect(result).toBe(false);
   });

   it("should return false if currentDay doesn't exist", () => {
      const state ={
         buttonPanel: { }
      };
      const result = isStarted(state);
      expect(result).toBe(false);
   });

   it("should return false if timestamps is empty", () => {
      const state ={
         buttonPanel: {
            currentDay: {
               timestamps: [ ]
            }
         }
      };
      const result = isStarted(state);
      expect(result).toBe(false);
   });
});

describe("getCurrentDayInfo selector", () => {
   it("should return fullTime and lastTimeStamp if currentDay exists and last timestamp isn't finished", () => {
      const startTime = "10:00";
      const fullTime = "6:00";
      const realTime = "6:00";
      const timestamps = [
          {
             startTime
          }
       ];
      const state = {
         buttonPanel: {
            currentDay: {
               fullTime,
               timestamps,
               realTime
            }
         },
         workdaysContainer: {
            workdays: [
               {
                  fullTime,
                  timestamps,
                  realTime
               }
            ]
         }
      };

      const result = getCurrentDayInfo(state);
      expect(result).toStrictEqual({
         lastFullTime: fullTime,
         lastStartTimestamp: startTime,
         realTime,
         timestamps
      });
   });

   it("should return fullTime and lastTimeStamp equal to null if currentDay doesn't exist", () => {
      const startTime = null;
      const fullTime = null;
      const realTime = null;
      const timestamps = null;

      const state = {
         buttonPanel: { },
         workdaysContainer: {
            workdays: []
         }
      };

      const result = getCurrentDayInfo(state);
      expect(result).toStrictEqual({
         lastFullTime: fullTime,
         lastStartTimestamp: startTime,
         realTime,
         timestamps
      });
   });

   it("should return lastTimeStamp equals to null if currentDay exists but last timestamp is finished", () => {
      const startTime = "10:00";
      const finishTime = "11:00";
      const fullTime = "6:00";
      const realTime = "6:00";
      const timestamps = [
         {
            startTime,
            finishTime
         }
      ];
      const state = {
         buttonPanel: {
            currentDay: {
               fullTime,
               timestamps,
               realTime
            }
         },
         workdaysContainer: {
            workdays: [
               {
                  fullTime,
                  timestamps,
                  realTime
               }
            ]
         }
      };

      const result = getCurrentDayInfo(state);
      expect(result).toStrictEqual({
         lastStartTimestamp: null,
         lastFullTime: fullTime,
         timestamps,
         realTime
      });
   });
});