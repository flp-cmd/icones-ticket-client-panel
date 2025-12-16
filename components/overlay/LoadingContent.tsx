import { TableSkeleton } from "../table/TableSkeleton";

interface LoadingContentProps {
  showTitle?: boolean;
  type?: "cards" | "table" | "filter-table";
  tableRows?: number;
  tableColumns?: number;
  filterFields?: number;
  filterColumns?: number;
}

interface FilterSkeletonProps {
  filterFields: number;
  filterColumns: number;
}

function FilterSkeleton({ filterFields, filterColumns }: FilterSkeletonProps) {
  return (
    <div className="mb-6 rounded-lg border border-[#e9ecef] bg-white p-6 shadow">
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-${filterColumns}`}
      >
        {Array.from({ length: filterFields }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded border border-gray-200 bg-gray-50"></div>
          </div>
        ))}
        <div className="flex items-end gap-2">
          <div className="h-10 flex-1 animate-pulse rounded bg-gray-200"></div>
          <div className="h-10 w-10 animate-pulse rounded border border-gray-200 bg-gray-50"></div>
        </div>
      </div>
    </div>
  );
}

export default function LoadingContent({
  showTitle = true,
  type = "cards",
  tableRows = 5,
  tableColumns = 4,
  filterFields = 2,
  filterColumns = 3,
}: LoadingContentProps) {
  return (
    <>
      {showTitle && (
        <div className="mb-8">
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>
      )}

      {type === "filter-table" ? (
        <>
          <FilterSkeleton
            filterFields={filterFields}
            filterColumns={filterColumns}
          />
          <div className="rounded-lg border border-[#e9ecef] bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
            </div>
            <TableSkeleton rows={tableRows} columns={tableColumns} />
          </div>
        </>
      ) : type === "table" ? (
        <TableSkeleton rows={tableRows} columns={tableColumns} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div
              key={card}
              className="rounded-lg border border-[#e9ecef] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
