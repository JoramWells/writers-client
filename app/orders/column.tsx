/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { AppointmentInterface } from 'motherangela';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/custom/Avatar';

export const columns: ColumnDef<AppointmentInterface>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'Patient.first_name',
    header: 'Patient Name',
    cell: ({ row }) => {
      const first_name = row.original?.Patient?.first_name;
      const middle_name = row.original?.Patient?.middle_name;
      return (
        <div className="flex-row flex space-x-2 items-center">
          <Avatar
            name={`${first_name} ${middle_name}`}
          />
          <Link href={`/patients/${row.original?.patient_id}`} className="capitalize text-[12px] text-cyan-500 hover:underline ">
            {first_name}
            {' '}
            {middle_name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'User.full_name',
    header: 'Attended By',
    cell: ({ row }) => (
      <div className="text-[12px] text-slate-500">
        <p>{row.original.User?.full_name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'appointment_date',
    header: 'Date',
    cell: ({ row }) => (
      <div className="text-[12px] text-slate-500">
        <p>{moment(row.original?.appointment_date).format('ll')}</p>
        {/* <p>{row.original.appointment_time}</p> */}
      </div>
    ),
  },
  {
    accessorKey: 'Insurance.insurance_name',
    header: 'Insurance',
    cell: ({ row }) => (
      <p className="text-[12px] text-slate-500">
        {row.original.Insurance?.insurance_name ?? 'N/A'}
      </p>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Details',
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button
          size="sm"
          className="shadow-none"
          variant="outline"
          onClick={() => router.push(`/visits/${row.original.appointment_id}?patient_id=${row.original.patient_id}`)}
        >
          <MoveRight />
        </Button>
      );
    },
  },
];


