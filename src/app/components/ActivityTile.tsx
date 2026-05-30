export default function ActivityCard() {
  const bars = [
  30, 70, 40, 90, 50,
  80, 60, 40, 70, 90,
  50, 75, 45, 85, 65,
];
  return (
    <section
      className="
      bg-gradient-to-br
      from-zinc-900
      to-zinc-800
      rounded-3xl
      p-8
      border
      border-zinc-800
      "
    >
      <h2 className="text-3xl font-bold mb-8">
        Activity
      </h2>

      <div className="flex gap-2 items-end">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-4 bg-green-500 rounded"
            style={{
              height: `${height}px`,
            }}
          />
        ))}
      </div>
    </section>
  );
}