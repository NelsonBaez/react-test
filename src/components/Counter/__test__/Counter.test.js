import React from 'react';
import Counter from '../Counter';
import { render, fireEvent} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"

let getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
})

test('header renders with correct text', () => {
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
})

test("counter starts at 0", () => {
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");
})

test("input contains initial value of 1", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1")
})

test("add button renders with +", () => {
  const addBtnEl = getByTestId("add-btn");

  expect(addBtnEl.textContent).toBe("+");
})

test("subtract button renders with -", () => {
  const subBtnEl = getByTestId("sub-btn");

  expect(subBtnEl.textContent).toBe("-");
})

test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, {
    target:{
      value: "5"
    }
  })

  expect(inputEl.value).toBe("5");
})

test("click on plus adds 1 to counter", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");


  expect(counterEl.textContent).toBe("0");

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("1");
})

test("click on minus subtract 1 to counter", () => {
  const subBtnEl = getByTestId("sub-btn");
  const counterEl = getByTestId("counter");


  expect(counterEl.textContent).toBe("0");

  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("-1");
})

test("changing input value then clicking on add btn works correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value:"5"
    }
  });

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("5");
})

test("changing input value then clicking on sub btn works correctly", () => {
  const subBtnEl = getByTestId("sub-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value:"5"
    }
  });

  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("-5");
})

test("adding and then subtracting leads to the correct counter", () => {
  const addBtnEl = getByTestId("add-btn");
  const subBtnEl = getByTestId("sub-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value:"10"
    }
  });

  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, {
    target: {
      value:"5"
    }
  });

  fireEvent.click(addBtnEl);
  
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("15");
})

test("counter contains correct className", () => {
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  const addBtnEl = getByTestId("add-btn");
  const subBtnEl = getByTestId("sub-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, {
    target: {
      value:"50"
    }
  });

  fireEvent.click(addBtnEl);

  expect(counterEl.className).toBe("");

  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  expect(counterEl.className).toBe("");
  
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  expect(counterEl.className).toBe("red");
})