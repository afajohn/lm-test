'use client'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { SquareChevronDown } from 'lucide-react';
import { useConfigStore } from "@/store/useConfigStore";
import { useConfigHooks } from '@/hooks/admin';
import PreviewRotator from './PreviewRotator';

const RotatorConfig = () => {
  const {rotator, filteredRotator, setFilteredRotator, search, setSearch,fetchRotator, setRotator}= useConfigHooks();
  const [open, setOpen] = useState(false);
  const {selectedSite, setSelectedSite} = useConfigStore();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRotator(rotator);
      setOpen(false); 
    } else {
      const filtered = rotator.filter(site => 
        site.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRotator(filtered);
      setOpen(true); 
    }
  }, [search, rotator, setFilteredRotator]);

  const getWomenRotator = useCallback(async () => {
    const response = await fetch(process.env.NEXTAUTH_URL+'/api/ladies?allsites=true');
    const data = await response.json();
    console.log(data);
    if (data) {
      const websites = data.map((item: { website: string }) => item.website);
      setRotator(websites);
      setFilteredRotator(websites);
    }
  }, [setFilteredRotator, setRotator]); 

  useEffect(() => {
    getWomenRotator();
  }, [getWomenRotator]);

  const handleSelectSite= (site:string) =>{
    fetchRotator();
    setSelectedSite(site);
    setOpen(false);
  }
  const handleSearch =(e: React.ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      setSelectedSite("");
  }

  return (
    <div>
      <Card className="p-5 mt-5">
        <h1 className="text-xl">Woman Rotator</h1>

        <Collapsible open={open} onOpenChange={setOpen}>
          <input
            type="text"
            placeholder="You may also search here"
            className="border border-gray-400 p-1 rounded-md mt-5 w-[400px] mr-1"
            value={selectedSite ? selectedSite : search}
            onChange={handleSearch}
          />
          <CollapsibleTrigger asChild>
            <button type="button"  onClick={() => setOpen(!open)}>
              <SquareChevronDown size={25} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 border p-2 rounded-md max-h-[200px] overflow-y-auto">
            {filteredRotator.length > 0 ? (
              <ul>
                {filteredRotator.map((site) => (
                  <li key={site} className="cursor-pointer hover:bg-gray-100 p-2">
                    <button type="button" className="w-full text-left" onClick={() => handleSelectSite(site)}>
                      {site}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </CollapsibleContent>
        </Collapsible>
       <PreviewRotator/>
      </Card>
    </div>
  );
};

export default RotatorConfig;
