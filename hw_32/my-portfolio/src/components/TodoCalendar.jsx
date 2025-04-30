import * as React from "react";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Badge, Tooltip, Box } from "@mui/material";
import { format } from "date-fns";

const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : null);

function ServerDay({ day, outsideCurrentMonth, todosByDate, ...other }) {
  const formatted = formatDate(day);
  const taskCount = todosByDate[formatted] || 0;
  const isSelected = taskCount > 0;

  return (
    <Tooltip
      key={formatted}
      title={`Задач: ${taskCount > 0 ? taskCount : "Нет задач"}`}
      placement="top"
    >
      <Box>
        <Badge overlap="circular" badgeContent={isSelected ? "🌚" : undefined}>
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
          />
        </Badge>
      </Box>
    </Tooltip>
  );
}

const TodoCalendar = ({ value, onChange, todosByDate }) => {
  return (
    <DateCalendar
      value={value}
      onChange={onChange}
      slots={{
        day: (props) => <ServerDay {...props} todosByDate={todosByDate} />,
      }}
    />
  );
};

export default TodoCalendar;
