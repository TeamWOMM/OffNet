import { useEffect, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/kokonutui/tables";

export default function useRouteTo(uri, setState, data) {
    const component = useMemo(() => {
        if (uri === 'table' && Array.isArray(data)) {
            return (
                <div className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-800">
                                        <TableHead className="text-purple-400">Subject</TableHead>
                                        <TableHead className="text-purple-400">Progress</TableHead>
                                        <TableHead className="text-purple-400">Status</TableHead>
                                        <TableHead className="text-purple-400">Last Activity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((row) => (
                                        <TableRow key={row.id} className="border-gray-800">
                                            <TableCell className="font-medium text-gray-300">{row.subject}</TableCell>
                                            <TableCell className="text-gray-400">{row.progress}</TableCell>
                                            <TableCell className="text-gray-400">{row.status}</TableCell>
                                            <TableCell className="text-gray-400">{row.lastActivity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }, [uri, data]);

    useEffect(() => {
        if (setState) {
            setState(component);
        }
    }, [component, setState]);

    return component;
}