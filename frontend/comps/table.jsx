import {
    Coins,
    MessageSquare,
    X,
    Activity,
    ArrowUpRight,
    Plus,
    Target,
    CheckCircle2,
    Table as TableIcon
  } from 'lucide-react';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/kokonutui/tables";
  import SearchBar from '@/components/ui/kokonutui/SearchComponent';


  function handleSearch(){
    console.log("Search");
  }

  const tableData = [
    { id: 1, resource: "Mathematics", progress: "85%", status: "On Track", lastActivity: "2h ago" },
    { id: 2, resource: "Physics", progress: "72%", status: "Need Focus", lastActivity: "1d ago" },
    { id: 3, resource: "Chemistry", progress: "93%", status: "Excellent", lastActivity: "5h ago" },
  ];


export default function _Table({ data=tableData }){
  data = tableData;
    return (<>
    
    <div className="flex-1 p-6 overflow-auto">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Dark themed table */}
                <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <TableIcon className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-bold text-white">Learning Progress</h2>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-purple-400">Resource</TableHead>
                        <TableHead className="text-purple-400">Progress</TableHead>
                        <TableHead className="text-purple-400">Status</TableHead>
                        <TableHead className="text-purple-400">Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id} className="border-gray-800">
                          <TableCell className="font-medium text-gray-300">{row.resource}</TableCell>
                          <TableCell className="text-gray-400">{row.progress}</TableCell>
                          <TableCell className="text-gray-400">{row.status}</TableCell>
                          <TableCell className="text-gray-400">{row.lastActivity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="py-6 animate-fade-in">
              
          </div>
            </div>
    

    </>);
}