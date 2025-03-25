import React from 'react'
import { useConfigHooks } from '@/hooks/admin'
import { useConfigStore } from '@/store/useConfigStore'; 
import {
  Card,
} from "@/components/ui/card"


const Colors = () => {
    const {invalidColors, primaryShades, secondaryShades, accentShades}=useConfigHooks();
    const {colors, setColors}= useConfigStore();

  return (
    <div>
      <Card className='mt-5 py-5 px-10 rounded-lg '>
      <h1 className='text-2xl mb-5'>Theme</h1>
     <div className='flex flex-col gap-5'>
     <div className='flex items-center'>
   <label htmlFor="primary" className='pr-1'>Primary</label>
   <input
  type="text"
  placeholder="hexcode"
  className="border border-gray-500 p-1 text-base w-[100px]"
  name="primary"
  id="primary"
  value={colors.primary}
  onChange={(e) => setColors({ primary: e.target.value })}
/>
  {colors.primary && invalidColors.primary && <p className="text-red-400 text-xs">Invalid value</p>}
   
   <label htmlFor="secondary" className='pl-5 pr-1' >Secondary</label>
   <input
  type="text"
  placeholder="hexcode"
  className="border border-gray-500 p-1 text-base w-[100px]"
  name="primary"
  id="primary"
  value={colors.secondary}
  onChange={(e) => setColors({ secondary: e.target.value })}
/>

   {colors.secondary && invalidColors.secondary && <p className="text-red-400 text-xs">Invalid value</p>}

   
   <label htmlFor="accent"  className='pl-5 pr-1'>Accent</label>
   <input
  type="text"
  placeholder="hexcode"
  className="border border-gray-500 p-1 text-base w-[100px]"
  name="primary"
  id="primary"
  value={colors.accent}
  onChange={(e) => setColors({ accent: e.target.value })}
/>

   {colors.accent && invalidColors.accent && <p className="text-red-400 text-xs">Invalid value</p>}
   </div>


<div className='flex flex-col gap-10'>
 
<ul className='flex gap-2 items-center'>
  <span style={{color:primaryShades[500]}}>P</span>
  {(!invalidColors.primary && colors.primary  && primaryShades && Object.keys(primaryShades).length > 0
    ? Object.entries(primaryShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>

<ul className='flex gap-2 items-center'>
<span style={{color:secondaryShades[500]}}>S</span>
  {(!invalidColors.secondary && colors.secondary && secondaryShades && Object.keys(secondaryShades).length > 0
    ? Object.entries(secondaryShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>

<ul className='flex gap-2 items-center'>
<span style={{color:accentShades[500]}}>A</span>
  {(!invalidColors.accent && colors.accent && accentShades && Object.keys(accentShades).length > 0
    ? Object.entries(accentShades).map(([shade, color]) => (
        <li key={shade} style={{ backgroundColor: color }} className="pb-1 text-white h-[60px] w-[70px] rounded-md text-sm flex items-end text-center">
          {shade}: {color}
        </li>
      ))
    : <li style={{ backgroundColor: "#FFFFFF" }} className="p-1 border border-gray-300 text-black h-[60px] w-[70px] rounded-md text-xs flex items-end text-center">No shades available</li>
  )}
</ul>
</div>
     </div>
      </Card>
    </div>
  )
}

export default Colors
