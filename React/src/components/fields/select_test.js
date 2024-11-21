// Select.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

test("renders Select component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleChange = jest.fn();

  render(
    <Select
      id="testSelect"
      name="testSelect"
      value="option2"
      options={options}
      onChange={handleChange}
    />
  );

  // Verifica que el componente se renderice correctamente
  const selectElement = screen.getByTestId("testSelect");
  expect(selectElement).toBeInTheDocument();

  // Verifica que las opciones se rendericen correctamente
  options.forEach((opt) => {
    const optionElement = screen.getByText(opt.label);
    expect(optionElement).toBeInTheDocument();
  });

  // Simula un cambio en la selección
  fireEvent.change(selectElement, { target: { value: "option3" } });

  // Verifica que la función de cambio se haya llamado con el valor correcto
  expect(handleChange).toHaveBeenCalledWith("option3");
});
