import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";
import WorkSheetForm from "../components/work-sheet-form/WorkSheetForm";
import WorksheetTable from "../components/WorksheetTable";



const WorkSheet = () => {

    

  return (
    <div className="text-center my-8">
      {/* table */}
      <div>
        <WorksheetTable></WorksheetTable>
      </div>

      {/* form */}
      <div>
        <WorkSheetForm></WorkSheetForm>
      </div>
    </div>
  );
};

export default WorkSheet;
