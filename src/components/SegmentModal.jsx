import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function PositionDemo({ visible, onClose }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isVisible, setIsVisible] = useState(visible);
  const [inValid, setInvalid] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState({
    segment_name: "",
    schema: [],
  });
  const schemas = [
    { name: "First Name", code: "first_name" },
    { name: "Last Name", code: "last_name" },
    { name: "Gender", code: "gender" },
    { name: "Age", code: "age" },
    { name: "Account Name", code: "account_name" },
    { name: "City", code: "city" },
    { name: "State", code: "state" },
  ];
  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times mr-2"
        className=" mr-2"
        severity="secondary"
        outlined
        onClick={() => {
          onClose(() => !isVisible);
          setIsVisible(false);
        }}
      />
      <Button
        label="Save"
        icon="pi pi-check mr-2"
        autoFocus
        onClick={() => handleSave()}
      />
    </div>
  );
  const handleAddSchemaName = (value) => {
    setSelectedSchema((prev) => ({
      ...prev,
      segment_name: value,
    }));
  };
  const handleAddSchema = (value) => {
    setSelectedSchema((prev) => ({
      segment_name: prev.segment_name || "",
      schema: [...(prev.schema || []), value],
    }));
  };
  const handleSave = () => {
    if (!selectedSchema.segment_name) {
      setInvalid(true);
      return;
    }
    selectedSchema.schema.length === 0 && alert("No schema selected!");
    const payload = {
      segment_name: selectedSchema.segment_name,
      schema: selectedSchema.schema.map((s) => ({ [s.code]: s.name })),
    };
    fetch("https://eorvy2zq7sjn51o.m.pipedream.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("payload: ", payload);
  };
  return (
    <div className="card">
      <Dialog
        header="Saving Segment"
        className="m-5"
        visible={isVisible}
        position={"top"}
        style={{ width: "50vw", height: "90vh" }}
        draggable={false}
        resizable={false}
        footer={footerContent}
        onHide={() => {
          if (!isVisible) return;

          onClose(() => !isVisible);
          setIsVisible(false);
        }}
      >
        <div className="flex flex-column gap-2">
          <label htmlFor="segment_name">Enter the name of the segment</label>
          <InputText
            id="segment_name"
            className="mb-3 p-inputtext-sm"
            value={selectedSchema.segment_name}
            invalid={inValid}
            onChange={(e) => handleAddSchemaName(e.target.value)}
          />
        </div>

        <Divider
          align="start"
          className="my-3 cursor-pointer"
          onClick={() => setShowDropDown(true)}
        >
          <span className="p-tag">+ Add new schema</span>
        </Divider>

        {showDropDown && (
          <Dropdown
            value={selectedSchema}
            onChange={(e) => handleAddSchema(e.value)}
            options={schemas.filter(
              (s) => !selectedSchema.schema.some((sel) => sel.code === s.code)
            )}
            optionLabel="name"
            placeholder="Add schema to segment "
            className="w-full mb-2 p-inputtext-sm"
          />
        )}
        {selectedSchema.schema.length > 0 ? (
          <div
            className="border-2 border-round-sm grid mt-2"
            style={{ borderColor: "#1ca1faff" }}
          >
            {selectedSchema.schema.length > 0 &&
              selectedSchema.schema.map((schema, i) => (
                <div className="col-6" key={i}>
                  <Dropdown
                    value={schema}
                    onChange={(e) => handleAddSchema(e.value)}
                    options={[
                      ...schemas.filter(
                        (s) =>
                          !selectedSchema.schema.some(
                            (sel) => sel.code === s.code
                          )
                      ),
                      schema,
                    ]}
                    optionLabel="name"
                    placeholder="Add schema to segment"
                    className="w-full p-inputtext-sm"
                  />
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center font-bold">No schema selected</p>
        )}
      </Dialog>
    </div>
  );
}
