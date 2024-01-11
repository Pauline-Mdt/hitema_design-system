import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {useEffect, useState} from "react";
import {getPublicHolidays} from "../../services/publicHolidaysApi";
import {addDaysToDate} from "../../services/date";
import useNavigateTo from "../../customHooks/useNatigateTo";

const Calendar = ({isAdminView, tattooistsWorkplacesEvents}) => {
    const {navigateToNew, navigateToId} = useNavigateTo();

    const [publicHolidays, setPublicHolidays] = useState([]);

    useEffect(() => {
        getPublicHolidays()
            .then(({data}) => {
                setPublicHolidays(data)
            })
            .catch(({response}) => {
                console.log(response)
                alert(response.data.message)
            })
    }, []);

    const handleEventClick = (eventClickInfo) => {
        navigateToId(eventClickInfo.event.id)
    }

    const choseColor = (workplaceId) => {
        switch (workplaceId) {
            case 1:
                return 'red';
            case 2:
                return 'orange';
            case 3:
                return 'yellow';
            case 4:
                return 'green';
            case 5:
                return 'blue';
            default:
                return '';
        }
    }

    return (
        <FullCalendar plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                      locale="fr"
                      fixedWeekCount={false}
                      firstDay="1"
                      headerToolbar={{
                          center: isAdminView? 'addTattooistWorkplaceButton': null,
                      }}
                      // headerToolbar={{
                      //     left: 'prev,next today',
                      //     center: 'title',
                      //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      // }}
                      customButtons={{
                          addTattooistWorkplaceButton: {
                              text: 'Ajouter une nouvelle présence',
                              click: navigateToNew
                          }
                      }}
                      eventClick={handleEventClick}
                      eventSources={[
                          Object.entries(publicHolidays).map(([key, value]) => {
                              return {
                                  start: key,
                                  title: value,
                                  // backgroundColor: 'grey',
                                  // borderColor: 'grey',
                                  display: 'background'
                              }
                          }),
                          tattooistsWorkplacesEvents.map((tattooistsWorkplacesEvent) => {
                              let color = isAdminView? choseColor(tattooistsWorkplacesEvent.workplace_id): null;

                              return {
                                  id: tattooistsWorkplacesEvent.id,
                                  allDay: true,
                                  start: tattooistsWorkplacesEvent.start_date,
                                  end: addDaysToDate(tattooistsWorkplacesEvent.end_date, 1),
                                  title: tattooistsWorkplacesEvent.tattooist.name,
                                  backgroundColor: color,
                                  borderColor: color,
                              }
                          })
                      ]}
        />
    );
}

export default Calendar;