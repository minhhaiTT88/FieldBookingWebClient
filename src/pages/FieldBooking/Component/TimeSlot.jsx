import moment from "moment";
import { useEffect, useState } from "react";
import TimeSlotByDate from "./TimeSlotByDate";

function getNextFiveDays() {
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  let daysList = [];
  for (let i = 0; i <= 6; i++) {
    let date = moment().add(i, "days");
    let dayObj = {
      dateFormatted: date.format("DD/MM"),
      date: date,
      day: daysOfWeek[date.day()],
      active: date.format("DD/MM") === moment().format("DD/MM"),
    };
    daysList.push(dayObj);
  }
  return daysList;
}

const TimeSlot = ({ fieldId, SelectTimeSlot }) => {
  const [listDate, setListDate] = useState([]);
  useEffect(() => {
    setListDate(getNextFiveDays());
  }, [fieldId]);

  return (
    <div className="flex">
      <div className="day-of-week">
        {listDate?.map((e, k) => (
          <div key={k} className={`day ${e.active ? "active" : ""}`}>
            <b>{e.day}</b>
            <small className="d-block">{e.dateFormatted}</small>
          </div>
        ))}
      </div>
      <div className="table-price">
        <div data-code="court7" className="table text-center">
          {listDate?.map((e, k) => (
            <TimeSlotByDate
              fieldId={fieldId}
              date={e.date}
              SelectTimeSlot={SelectTimeSlot}
              key={k}
            />
          ))}
          {/* <div data-day="CN" data-date="23/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">
                  <b>Hết</b>
                </div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="over-time frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">
                  <b>Quá hạn</b>
                </div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={8}
                data-price={800000}
                data-date="23/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T2" data-date="24/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={2}
                data-price={800000}
                data-date="24/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T3" data-date="25/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={3}
                data-price={800000}
                data-date="25/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T4" data-date="26/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price choose"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={4}
                data-price={800000}
                data-date="26/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T5" data-date="27/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={5}
                data-price={800000}
                data-date="27/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T6" data-date="28/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={6}
                data-price={800000}
                data-date="28/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div>
          <div data-day="T7" data-date="29/6/2024" className="row">
            <div className="set-yard am d-none">
              <div
                data-time-frame="05:00 - 06:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">05:00 - 06:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="06:30 - 08:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">06:30 - 08:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="08:00 - 09:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">08:00 - 09:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="09:30 - 11:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">09:30 - 11:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="11:00 - 12:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">11:00 - 12:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard am d-none">
              <div
                data-time-frame="12:30 - 14:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">12:30 - 14:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="14:00 - 15:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">14:00 - 15:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="15:30 - 17:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">15:30 - 17:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="17:00 - 18:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">17:00 - 18:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="18:30 - 20:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">18:30 - 20:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="20:00 - 21:30"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">20:00 - 21:30</span>
                <div className="price-label">800K</div>
              </div>
            </div>
            <div className="set-yard pm">
              <div
                data-time-frame="21:30 - 23:00"
                data-day={7}
                data-price={800000}
                data-date="29/6/2024"
                frame-price=""
                className="frame-price"
              >
                <span className="price-label text-nowrap">21:30 - 23:00</span>
                <div className="price-label">800K</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default TimeSlot;
