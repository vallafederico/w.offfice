import { CONTENT } from "./content.js";

export default function () {
  return (
    <ul class="mt-2">
      <div class="flex justify-end py-1">
        <h2 class="font-bold  text-lg">Archive.</h2>
        {/* <p>More</p> */}
      </div>
      {CONTENT.list.map((item) => (
        <li class="flex justify-between uppercase border-black border-t py-1">
          <div class="w-[33%]">
            <p class="inline ft-gs mr-3">{item.name}</p> {item.year}
          </div>
          <div class="w-[10%] flex justify-between">
            <div>{"•"}</div>
            <div>{"•"}</div>
          </div>
          <div class="">
            <span class="text-[8px] lowercase mr-6">{item.type}</span>{" "}
            {item.object}
          </div>
        </li>
      ))}
    </ul>
  );
}
