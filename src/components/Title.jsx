export default function () {
  return (
    <div class="uppercase sm:text-[17vh] md:text-[14vw] text-[13vw] leading-[.8em] md:mt-[-.05em] mt-[10vh]">
      <div>office for</div>
      <div class="flex">
        future
        <div class="w-full lg:flex hidden justify-between align-middle content-center text-xs ml-[10%]">
          <div class="flex flex-col justify-center ">
            <p class="max-w-[30ch]">
              <span class="italic">FUTURE </span>
              LIVING <span class="font-bold">DESIGN</span> RESEARCH STUDIO •
              INSTALLATIONS, COMMERCIAL AND PRIVATE SPACES
            </p>
          </div>
          <div class="flex flex-col justify-center ">
            <p class=" h-[1em] italic">MLN / BCN / ZCH</p>
          </div>
        </div>
      </div>
      <div>furnishing.</div>

      {/* mobile alt */}
      <div class="w-full lg:hidden flex justify-between align-middle content-center text-xs mt-4">
        <div class="flex flex-col justify-center ">
          <p class="max-w-[25ch] ">
            <span class="italic">FUTURE </span>
            LIVING <span class="font-bold">DESIGN</span> RESEARCH STUDIO •
            INSTALLATIONS, COMMERCIAL AND PRIVATE SPACES
          </p>
        </div>
        <div class="flex flex-col justify-center ">
          <p class=" h-[1em] italic">MLN / BCN / ZCH</p>
        </div>
      </div>
    </div>
  );
}
