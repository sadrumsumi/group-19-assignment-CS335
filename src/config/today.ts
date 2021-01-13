import * as moment from "moment-timezone";

export function Today(date: Date): any {
  return moment(date).tz("Africa/Dar_es_Salaam");
}