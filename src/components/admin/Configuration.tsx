'use client'

import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
  import {
	CircleHelp,
	Flame,
	Images,
	MenuIcon,
	Video,
	Wrench,
	X,
    CircleCheckBig,
    Ellipsis,
    Check,
    Minus,
    Loader,
    CircleX, 
    ChevronDown
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useConfigHooks } from '@/hooks/admin';
import LogoConfig from './config/branding-config/LogoConfig';
import Colors from './config/branding-config/Colors';
import { useConfigStore } from '@/store/useConfigStore';
import RotatorConfig from './config/branding-config/RotatorConfig';
import {
  Card,
} from "@/components/ui/card"
import HeaderNav from './config/navigations-config/HeaderNav';
import SearchTools from './config/navigations-config/SearchTools';

  

const Configuration = () => {
  const { navList,setNavList, navInput, setNavInput, navItemInput, setNavItemInput, expandedNavIndex, setExpandedNavIndex,
    editingNavList, setEditingNavlist, navInputEdit, setNavInputEdit, editingNavItem, setEditingNavItem, navItemInputEdit, setNavItemInputEdit, open, setOpen,
    selectedList,selectedNavItem,loadingNav,handleSetConfig, editNavItem,toggleNavItem,handleDeleteList,editNavList,handleAddNavlist,handleIconChange,handleAddNavListItem,openDeleteDialog, getCurrentConfig} = useConfigHooks();

    const iconOptions = [
        { name: "Flame", component: <Flame /> },
        { name: "CircleHelp", component: <CircleHelp /> },
        { name: "Images", component: <Images /> },
        { name: "Wrench", component: <Wrench /> },
        { name: "Video", component: <Video /> },
        { name: "MenuIcon", component: <MenuIcon /> },

    ];

    const {success,setSuccess} =useConfigStore();

    useEffect(() => {
      if(success === 'success') {
        toast.success("Updated successfully!", {
          icon: <CircleCheckBig className="text-green-500" />,
        })
        setSuccess("");
      }
      else if(success === 'failed') {
        toast.error("Update failed!", {
          icon: <CircleX className="text-red-500" />,
        })
      }
    }, [success,setSuccess]);

    useEffect(() => {
      getCurrentConfig();
    }, [getCurrentConfig]);
    
  return (
    <div>

      <div className='flex items-center pl-5 pt-5'>
      <h1 className=' text-2xl '>Branding Configuration</h1> <Button  
  className="relative border border-cyan-400  hover:bg-gradient-to-t hover:from-sky-500 hover:to-indigo-500 ml-2 w-[60px] h-[30px] text-black hover:text-white transition-all duration-300  
  before:absolute before:inset-0 before:-z-10 before:rounded-md before:blur-md before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100  
  hover:before:bg-gradient-to-t hover:before:from-sky-500 hover:before:to-indigo-500"  
  onClick={handleSetConfig}  
>  
  Save  
</Button>
      </div>

      <div className='flex gap-5'>
     <div className='flex flex-col gap-5'>
      
     <div className='flex gap-5 ml-5'>
      {/* LOGO */}
    <div>
    <LogoConfig/>
    <RotatorConfig/>
    </div>
      <div>
      <Colors/>
      </div>
     </div>

{/* SIDEBAR */}
<h1 className='text-2xl pl-5'>Navigations</h1>
<div className='flex gap-5'>
<Card className='ml-5 py-5 px-10 mb-10 rounded-lg w-[650px]'>
        <div className='flex flex-col'>
        <h1 className=' text-xl pb-3'>Side Navigation </h1>
          <div className='flex gap-3 mb-2'>  
            <input type="text" value={navInput} onChange={(e) => setNavInput(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
                handleAddNavlist();
            }
        }}
         name='navlist' 
         id='navlist' placeholder='Add nav list' 
         className='p-2 border border-gray-400 w-[400px] rounded-md' />
          <Button onClick={handleAddNavlist} className='border border-green-400 text-black'>add</Button>
          </div>
        </div>

        <ul className='mb-5'>
    {navList.map((nav, index) => (
        <li key={nav.title} className="text-base w-[500px] rounded-md cursor-pointer"  >
            <div className="" >
            {editingNavList === index ? (
                <>
                <div className="flex justify-between py-2 pl-2 border border-gray-400 items-center">
                <input className='w-[480px] px-2'
    type="text" 
    value={navInputEdit} 
    onChange={(e) => setNavInputEdit(e.target.value)}
    onBlur={() => {
        setNavList((prevNavList) => 
            prevNavList.map((navItem, i) => 
                i === editingNavList ? { ...navItem, title: navInputEdit } : navItem
            )
        );
        setEditingNavlist(null); 
    }}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            setNavList((prevNavList) => 
                prevNavList.map((navItem, i) => 
                    i === editingNavList ? { ...navItem, title: navInputEdit } : navItem
                )
            );
            setEditingNavlist(null);
        }
    }}
/>
            </div>
                </>
            ) : (
                <>
                 <div className="flex justify-between py-2 pl-2 border border-gray-400 items-center">
                <span className="flex items-center gap-2 text-base" onClick={()=>editNavList(index)}>
                    {iconOptions.find((icon) => icon.name === nav.icon)?.component}
                    {nav.title} {loadingNav === nav.title && <Loader />}
                </span>
                <div className='flex gap-2'>
                <select
    className="border border-gray-400 p-1 text-xs"
    value={nav.icon && iconOptions.some(icon => icon.name === nav.icon) ? nav.icon : "Select an Icon"}
    onChange={(e) => handleIconChange(index, e.target.value)}
>
    <option disabled>Select an Icon</option> 
    {iconOptions.map((icon) => (
        <option key={icon.name} value={icon.name}>{icon.name}</option>
    ))}
</select>
                    <DropdownMenu>
  <DropdownMenuTrigger className='pr-2'><Ellipsis /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem className='cursor-pointer' onClick={() => toggleNavItem(index)} >Add list item</DropdownMenuItem>
    <DropdownMenuItem className='cursor-pointer' onClick={() => openDeleteDialog( "navList",nav.title) } >Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                </div>
            </div>
                </>
            )}
            </div>
           
            {expandedNavIndex === index && (
                <div className="flex items-center border border-gray-400 px-2">
                    <input
                        type="text"
                        name="navItem"
                        placeholder="add list item +"
                        className="py-2 text-base w-[400px] outline-none"
                        value={navItemInput}
                        onChange={(e) => setNavItemInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                              handleAddNavListItem();
                          }
                      }}
                    />
                    <span  className="text-green-500 px-2 hover:border-green-500 border border-white" onClick={handleAddNavListItem}><Check /></span>
                    <X size={30} className="cursor-pointer text-red-400" onClick={() => setExpandedNavIndex(null)} />
                </div>
            )}
          <ul>
    {nav.items.map((subItem, subIndex) => (
        <li key={subItem.name}>
          <TooltipProvider>
          <Collapsible>
  <div className="flex items-center justify-between px-2 py-2 border border-gray-400 ">
    {editingNavItem?.navIndex === index && editingNavItem?.itemIndex === subIndex ? (
      <input
        type="text"
        value={navItemInputEdit}
        onChange={(e) => setNavItemInputEdit(e.target.value)}
        onBlur={() => {
          setNavList((prevNavList) =>
            prevNavList.map((navItem, navIdx) =>
              navIdx === index
                ? {
                    ...navItem,
                    items: navItem.items.map((item, itemIdx) =>
                      itemIdx === subIndex ? { ...item, name: navItemInputEdit } : item
                    ),
                  }
                : navItem
            )
          );
          setEditingNavItem(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setNavList((prevNavList) =>
              prevNavList.map((navItem, navIdx) =>
                navIdx === index
                  ? {
                      ...navItem,
                      items: navItem.items.map((item, itemIdx) =>
                        itemIdx === subIndex ? { ...item, name: navItemInputEdit } : item
                      ),
                    }
                  : navItem
              )
            );
            setEditingNavItem(null);
          }
        }}
        className="p-1 border border-gray-400 w-full"
      />
    ) : (
      <span
        className="flex gap-2 text-base items-center cursor-pointer pointer-events-auto"
        onClick={() => editNavItem(index, subIndex)}
      >
        {subItem.name} {loadingNav === subItem.name && <Loader />}
      </span> 
    )}

    <span className='flex gap-3'>
    <Tooltip>
      <TooltipTrigger asChild>
    <Minus size={20} className='text-red-400' onClick={()=>openDeleteDialog("navItem",subItem.name)} />
      </TooltipTrigger>
       <TooltipContent>Remove item</TooltipContent>
        </Tooltip>
    <CollapsibleTrigger asChild>
      <button  type='button'>
        <ChevronDown className="h-5 w-5" />
      </button>
    </CollapsibleTrigger>
    </span>
  </div>
  <CollapsibleContent className="border border-gray-300">
  <div className='flex items-center'>
  <label htmlFor="link" className="px-2 text-base">Link</label>
    <input
      type="text"
      name="link"
      id="link"
      placeholder="Link"
      className="px-2 text-base border border-gray-400 w-[350px]"
      value={subItem.link}
      onChange={(e) => {
        const newLink = e.target.value;
        setNavList((prevNavList) =>
          prevNavList.map((navItem, navIdx) =>
            navIdx === index
              ? {
                  ...navItem,
                  items: navItem.items.map((item, itemIdx) =>
                    itemIdx === subIndex ? { ...item, link: newLink } : item
                  ),
                }
              : navItem
          )
        );
      }}
    />
  </div>
  </CollapsibleContent>
</Collapsible>
</TooltipProvider>

        </li>
    ))}
</ul>
        </li>
    ))}
</ul>
</Card>

{/* Header Nav */}
<div>
<HeaderNav/>
<SearchTools/>
</div>

</div>

     </div>
    <div>
    </div>
     </div>
    {/* DIALOG */}
     <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this {selectedList ? "list" : "item"}?</AlertDialogTitle>
      <AlertDialogDescription>
        {selectedList || selectedNavItem?.name}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-400 hover:bg-red-500" onClick={handleDeleteList}>
        Confirm Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default Configuration
