'use client'

import DataTable from "./components/datatable";
import { useRouter } from 'next/navigation';
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  return (
      <div>
          <Navbar/>
          <DataTable />
      </div>
  );
}
