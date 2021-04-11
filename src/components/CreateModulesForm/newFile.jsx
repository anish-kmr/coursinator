import React from "react";
import RichTextEditor from "react-rte";
import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import ModuleDetails from "components/ModuleDetails";
import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import HandleIllegalRoutes from 'services/HandleIllegalRoutes';
import AppContext from "contexts/AppContext";
import "./create_modules_form.css";

const useStyles = makeStyles({
  formControl: {
    marginBottom: "2rem",
  },
  formInput: {
    fontSize: "1.4rem",
  },
  extendedIcon: {
    margin: "1.2rem",
    fontSize: "2rem",
  },
  fabControl: {
    top: "10px",
    left: "800px",

    fontSize: "2rem",
  },
  button: {
    padding: "1rem 4rem",
    marginRight: "1rem",
    marginBottom: "2rem",
  },
});

const NewFile = (props) => {
  HandleIllegalRoutes();
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  let history = useHistory();
  let location = useLocation();
  const [mode, setMode] = useState("edit");
  let { moduleList, setModuleList, activeStep, setActiveStep } = useContext(
    AppContext
  );
  const [state, setState] = useState({
    name: "",
    description: "",
    durationTime: "",
    durationUnit: "weeks",
    duration:''
  });
  const classes = useStyles();
  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleBack = () => {
    setActiveStep(1);
    history.goBack();
  };

  const handleAdd = () => {
    setModuleList([
      ...moduleList,
      { ...state, content: editorValue.toString("html"), duration:state.durationTime+"-"+state.durationUnit },
    ]);
    setActiveStep(1);
    history.goBack();
  };

  const editorHandler = (v) => {
    setEditorValue(v);
  };
  const handleMode = (event, newMode) => {
    // if (newMode == "edit") document.getElementById("preview").innerHTML = " ";
    // else if (newMode == "preview")
    //   document.getElementById("preview").innerHTML = editorValue.toString(
    //     "html"
    //   );
    setMode(newMode);
  };
  return (
    <>
      <div className="create_modules_header">
        <h2>Create Module</h2>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleMode}
          aria-label="Mode"
        >
          <ToggleButton value="edit" aria-label="left aligned">
            Edit
          </ToggleButton>
          <ToggleButton value="preview" aria-label="centered">
            Preview
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {
        mode === "preview" &&
        <div id="preview">
          <ModuleDetails module={{ ...state, content: editorValue.toString("html") }} />
        </div>  
      }
      {mode === "edit" && (
        <>
          <div className="course_detail_form_container">
            <div>
              <FormControl
                className={classes.formControl}
                fullWidth
                variant="outlined"
              >
                <label htmlFor="course_name" className="input_label">
                  Module Name
                </label>
                <OutlinedInput
                  id="course_name"
                  name="name"
                  value={state.name}
                  onChange={handleChange("name")}
                  className={classes.formInput}
                />
              </FormControl>
              <FormControl
                className={classes.formControl}
                fullWidth
                variant="outlined"
              >
                <label htmlFor="course_intro" className="input_label">
                  Module Description
                </label>
                <OutlinedInput
                  id="course_intro"
                  name="description"
                  value={state.description}
                  onChange={handleChange("description")}
                  multiline
                  rows={5}
                  className={classes.formInput}
                />
              </FormControl>

              <div className="duration_form">
                <label htmlFor="course_duration" className="input_label">
                  Duration
                </label>
                <div className="input_group">
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="course_duration"
                      name="durationTime"
                      value={state.durationTime}
                      onChange={handleChange("durationTime")}
                      className={classes.formInput}
                    />
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    variant="outlined"
                  >
                    <Select
                      id="duration"
                      name="durationUnit"
                      value={state.durationUnit}
                      onChange={handleChange("durationUnit")}
                      className={classes.formInput}
                      style={{ paddingRight: "1.4rem" }}
                    >
                      <MenuItem className={classes.formInput} value="days">
                        Days
                      </MenuItem>
                      <MenuItem className={classes.formInput} value="weeks">
                        Weeks
                      </MenuItem>
                      <MenuItem className={classes.formInput} value="months">
                        Months
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="content_editor">
            <label>Content</label>
            <RichTextEditor
              editorClassName="text_editor"
              value={editorValue}
              onChange={(v) => editorHandler(v)}
            />
          </div>

          <div className="stepper_controls_container">

            <div className="stepper_controls">
              <Button
                className={classes.button}
                variant="outlined"
                onClick={handleBack}
              >
                Back
              </Button>
            </div>

            <div className="cancel">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleAdd}
              >
                Add
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NewFile;
