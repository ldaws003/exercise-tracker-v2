"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HistoryLoading from "../components/ui/HistoryLoading";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

//TODO: order descending by date
//TODO: beautify cards
//TODO: fix title 
//TODO: have pass number of entries per page to loader and have that many skeleton cards show
//TODO: add deletion
//TODO: add pagination, don't slice in client, assume api will handle it, write logic rn
export default function History(){
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [loaded, isLoaded] = useState(false);
    const [showData, setShowData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: session, status } = useSession();

    
    useEffect( () => {
        if(status === "unauthenticated"){
            router.push('/');
        }
    }, [status]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Add your fetch or state-updating logic here
    };


     let dummy_activity_data: any = {
        data: [
            {id: "1", activity: "running", duration: "300", date: "2026-05-23", calories: "300"},
            {id: "2", activity: "running", duration: "300", date: "2026-05-26", calories: "200"},
            {id: "3", activity: "running", duration: "300", date: "2026-05-28", calories: "10"},
            {id: "4", activity: "running", duration: "300", date: "2026-05-30", calories: "327"},
            {id: "5", activity: "weights", duration: "200", date: "2026-05-24", calories: "500"},
            {id: "6", activity: "biking", duration: "700", date: "2026-05-27", calories: "500"},
            {id: "7", activity: "biking", duration: "300", date: "2026-05-29", calories: "56"},
            {id: "8", activity: "weights", duration: "240", date: "2026-05-24", calories: "320"},
            {id: "9", activity: "biking", duration: "480", date: "2026-05-27", calories: "223"},
            {id: "10", activity: "biking", duration: "1200", date: "2026-05-29", calories: "760"},
        ]
    };

    // use API endpoint to get this
    //////////////////////////////////////////////////////////////////////////
    const entriesPerPage = 3;
    const totalPages = Math.ceil(dummy_activity_data.data.length / entriesPerPage); 
    //////////////////////////////////////////////////////////////////////////

    function SortByDate(history_data: any[]){
        return history_data.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // TODO: delete after api + backend is set up, and replace with api call
    /////////////////////////////////////////////////////////
    function pageData(history_data: any[], page: number, entry_per_page: number){
        const start = (page - 1) * entry_per_page;
        const end = start + entry_per_page;
        return history_data.slice(start, end)
    }

    useEffect(() => {
        setShowData(pageData(data, currentPage, entriesPerPage));
    }, [currentPage]);
    ////////////////////////////////////////////////////////////////////

    function DeleteActivity(event: any){
        // TODO: delete the selected entry
        event.preventDefault();
    }

    function Filter(history_data: any[], property: any, condition: any){
        return history_data.filter( (obj) => obj[property] == condition);      
    }

    // Add error handling
    function DateRange(history_data: any[], start_date: any, end_date: any){
        return history_data.filter( (obj) => {
            let time = new Date(obj.date).getTime();
            return (new Date(start_date).getTime() <= time) && (time <= new Date(end_date).getTime())
        });
    }

    // TODO: replace with API call
    ////////////////////////////////////////////////////
    useEffect( () => {
        if(status === "authenticated"){
            const fetchData = async () => {
                function sleep(ms: number){
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                // waits for 1000ms
                await sleep(1000);

                setData(dummy_activity_data.data);
                setShowData(pageData(dummy_activity_data.data, currentPage, entriesPerPage));
                isLoaded(true);
            };

            fetchData();
        }
    }, [status]);
    ///////////////////////////////////////////////////

    const renderPages = () => {
        const pages = [];

        // Always show the first page
        pages.push(
        <PaginationItem key={1}>
            <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(1); }}
            isActive={currentPage === 1}
            className="bg-transparent text-black hover:bg-emerald-500 data-[active=true]:text-black data-[active=true]:cursor-default hover:text-white data-[active=true]:bg-emerald-200"
            >
            1
            </PaginationLink>
        </PaginationItem>
        );

        // Show left ellipsis if current page is far from the beginning
        if (currentPage > 3) {
        pages.push(
            <PaginationItem key="left-ellipsis">
                <PaginationEllipsis />
            </PaginationItem>
        );
        }

        // Show pages immediately around the current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(
            <PaginationItem key={i}>
            <PaginationLink
                href="#"
                onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
                isActive={currentPage === i}
                className="bg-transparent text-black hover:bg-emerald-500 data-[active=true]:text-black data-[active=true]:cursor-default hover:text-white data-[active=true]:bg-emerald-200"
            >
                {i}
            </PaginationLink>
            </PaginationItem>
        );
        }

        // Show right ellipsis if current page is far from the end
        if (currentPage < totalPages - 2) {
        pages.push(
            <PaginationItem key="right-ellipsis">
                <PaginationEllipsis />
            </PaginationItem>
        );
        }

        // Always show the last page (if there is more than 1 page total)
        if (totalPages > 1) {
        pages.push(
            <PaginationItem key={totalPages}>
            <PaginationLink
                href="#"
                onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}
                isActive={currentPage === totalPages}
                className="bg-transparent text-black hover:bg-emerald-500 data-[active=true]:text-black data-[active=true]:cursor-default hover:text-white data-[active=true]:bg-emerald-200"
            >
                {totalPages}
            </PaginationLink>
            </PaginationItem>
        );
        }

        return pages;
    };


    return (
        <div className="flex items-center flex-col w-full">
            <h1 className="text-center">Workout History</h1>
            {
                loaded ?
                <div className="w-full px-2"> 
                    {
                        showData.map((entry: any, i: number) => {
                            return (
                                <Card className="max-w-[500px] sm:w-1/3 my-2 mx-auto">
                                    <CardHeader>
                                        <CardAction>
                                            <Button variant="destructive" type="button" onClick={DeleteActivity}>Delete</Button>
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent>
                                        <div key={`${entry}`} id={`${entry.id}`}>
                                            <p>{entry.activity}</p>
                                            <p>{entry.date}</p>
                                            <p>{Math.round(Number(entry.duration) / 60)} minutes</p>
                                            <p>{entry.calories} calories burned</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                    <Pagination>
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) handlePageChange(currentPage - 1);
                                }}
                                aria-disabled={currentPage === 1}
                                className={
                                    currentPage === 1 ? "pointer-events-none opacity-50" 
                                    : 
                                    "hover:text-gray-500"
                                }
                            />
                            </PaginationItem>

                            {/* Dynamically Generated Pages and Ellipses */}
                            {renderPages()}

                            {/* Next Button */}
                            <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) handlePageChange(currentPage + 1);
                                }}
                                aria-disabled={currentPage === totalPages}
                                className={currentPage === totalPages ?"pointer-events-none opacity-50" 
                                    : 
                                    "hover:text-gray-500"
                                }
                            />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
                :
                <HistoryLoading />
            }
        </div>
    )
}
