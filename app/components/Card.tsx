import ActionDropdown from "./ActionDropdown";
import DetailRow from "./DetailRow";

const actionsDropdownItems = [
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
];

const renderDetails = (data: PaintingJob) => (
  <div className="space-y-4 px-2 pt-2">
    <DetailRow label="Title:" value={data.title} />
    <DetailRow label="Description:" value={data.description} />
    <DetailRow
      label="Created At:"
      value={new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(data.createdAt))}
    />
  </div>
);

const Card = ({ data }: { data: PaintingJob }) => {
  return (
    <div className="file-card">
      <div className="flex justify-between">
        <p className="subtitle-2 line-clamp-1">{data.title}</p>
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown
            name="paintingJobs"
            renderDetails={renderDetails}
            actionsDropdownItems={actionsDropdownItems}
            data={data}
            fetchAction={null}
          />
        </div>
      </div>
      <div className="file-card-details">
        <p className="body-2 text-light-100">{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
