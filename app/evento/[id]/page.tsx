import EventDashboardContainer from "@/containers/event/EventDashboard";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  return <EventDashboardContainer scheduleId={id} />;
}
