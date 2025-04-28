"use client";
import React from // { useState }
"react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

const TextInput = () => {
  return (
    <form action="#" className="relative border-2 border-red-600">
      <div className="rounded-xl p-4 bg-gray-50 outline-1 -outline-offset-1 outline-gray-100 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-300">
        <textarea
          id="description"
          name="description"
          rows={2}
          placeholder="Write a description..."
          className="block border border-red-200 mb-2 w-full resize-none px-3 py-1.5 text-xl font-normal text-gray-700 placeholder:text-xl placeholder:text-gray-400 focus:outline-none h-16"
          defaultValue={""}
        />
      </div>

      <div className="inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}

        {/* BOTTOM ROW - Attach file and submit button */}
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          {/* SUBMIT BUTTON */}
          <div className="shrink-0 ml-auto">
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 w-22 text-center rounded-2xl bg-indigo-600  text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextInput;
