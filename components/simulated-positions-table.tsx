
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface SimulatedPosition {
  id: string;
  created_at: string;
  entry_price: number;
  direction: "BUY" | "SELL";
  status: "OPEN" | "CLOSED_TP" | "CLOSED_SL";
  amount_usd: number;
  leverage: number;
  close_price?: number;
  pnl_percent?: number;
}

interface SimulatedPositionsTableProps {
  positions: SimulatedPosition[];
}

export function SimulatedPositionsTable({ positions }: SimulatedPositionsTableProps) {
  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/5">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Simulated Positions History</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead>Time</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Close Price</TableHead>
                <TableHead className="text-right">PnL %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((pos) => (
                <TableRow key={pos.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                  <TableCell className="text-muted-foreground whitespace-nowrap text-xs">
                    {new Date(pos.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                      pos.direction === "BUY"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {pos.direction}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">${pos.entry_price.toFixed(4)}</TableCell>
                  <TableCell className="font-mono text-sm">${pos.amount_usd}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      pos.status === "OPEN" ? "bg-blue-500/10 text-blue-400" :
                      pos.status === "CLOSED_TP" ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-rose-500/10 text-rose-400"
                    }`}>
                      {pos.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {pos.close_price ? `$${pos.close_price.toFixed(4)}` : "-"}
                  </TableCell>
                  <TableCell className={`text-right font-mono font-bold ${
                    (pos.pnl_percent || 0) > 0 ? "text-emerald-400" : (pos.pnl_percent || 0) < 0 ? "text-rose-400" : ""
                  }`}>
                    {pos.pnl_percent ? `${pos.pnl_percent.toFixed(2)}%` : "-"}
                  </TableCell>
                </TableRow>
              ))}
              {positions.length === 0 && (
                 <TableRow>
                   <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                     No simulated positions yet.
                   </TableCell>
                 </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
