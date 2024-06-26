import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import React, { useEffect } from "react";
import CreateModal from "./CreateModal";
import { useState } from "react";
import axios from "axios";
import CheckCalendar from "./CheckModal/CheckCalendar";

const EconoCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectID, setSelectID] = useState("");
  const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleEventClick = (info) => {
    setSelectID(info.event._def.publicId);
    setCheckModalIsOpen(true);
  };
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setCreateModalIsOpen(true);
  };

  useEffect(() => {
    const instance = axios.create({
      baseURL: `${import.meta.env.VITE_ERROR_API}`,
      withCredentials: true,
    });
    instance
      .get("/api/calendar/all/2024-04-05")
      .then((res) => {
        const fetchedEvents = res.data.data.map((event) => ({
          title: event.eventName,
          id: event.eventId,
          start: event.eventStartDate.split("T")[0],
          end: event.eventEndDate.split("T")[0],
          color: "#beb9ff",
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={"ko"}
          height={"98vh"}
          headerToolbar={{
            left: "today prev title next",
            center: "",
            right: "",
          }}
          events={events}
          eventDisplay={"block"}
          dayCellContent={function (info) {
            var number = document.createElement("a");
            number.classList.add("fc-daygrid-day-number");
            number.innerHTML = info.dayNumberText.replace("일", "");
            if (info.view.type === "dayGridMonth") {
              return {
                html: number.outerHTML,
              };
            }
            return {
              domNodes: [],
            };
          }}
          titleFormat={(date) => {
            const year = date.date.year;
            const month = date.date.month + 1;
            if (month < 10) return year + ".0" + month;
            else return year + "." + month;
          }}
          buttonText={{
            today: "오늘",
          }}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
        />
      </CalendarContainer>
      <CheckCalendar
        isOpen={checkModalIsOpen}
        onRequestClose={() => setCheckModalIsOpen(false)}
        selectID={selectID}
        events={events}
        setEvents={setEvents}
      />
      <CreateModal
        isOpen={createModalIsOpen}
        onRequestClose={() => setCreateModalIsOpen(false)}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default EconoCalendar;

const CalendarContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  .fc-toolbar-chunk {
    display: flex;
  }

  .fc-prev-button {
    background-color: unset;
    color: #6c757d;
    border: none;
    &:hover {
      background-color: unset;
      color: #6c757d;
      border: none;
    }
  }
  .fc-next-button {
    background-color: unset;
    color: #6c757d;
    border: none;
    &:hover {
      background-color: unset;
      color: #6c757d;
      border: none;
    }
  }

  .fc-today-button {
    background-color: unset;
    color: #595959;
    border: 1px solid #cbcbcb;
    &:hover {
      background-color: unset;
      color: #595959;
      border: 1px solid #cbcbcb;
    }
  }
  .fc-today-button[disabled] {
    background-color: unset;
    color: #595959;
    border: 1px solid #cbcbcb;
  }
  .fc-day-sun a {
    color: red;
    text-decoration: none;
  }
  .fc-daygrid-day-top {
    width: 2rem;
    margin-left: 0.3rem;
  }
  .fc-day-today {
    background: #fff !important;
  }
  .fc-day-today .fc-daygrid-day-top {
    background: #ff9999 !important;
    border-radius: 50% !important;
    color: #fff;
    margin-left: 0.5rem;
    width: 1.7rem;
  }
  .fc-day-today .fc-daygrid-day-frame {
    margin-top: 0.2rem;
  }
  .fc-day-today .fc-daygrid-day-number {
    margin-top: 0.1rem;
    width: 2rem;
  }
  .fc-daygrid-day-number {
    margin-top: 0.3rem;
  }
  .fc-toolbar-title {
    margin-top: 0.2em;
  }
  .fc-scrollgrid-sync-inner {
    border: none;
  }
  .fc-col-header-cell {
    border-right: none;
    border-left: none;
  }
`;
