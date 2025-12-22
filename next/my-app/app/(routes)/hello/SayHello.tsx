'use client'; // 엄밀히 말하면 SayHello 안에 이걸 붙여야 함.
export default function SayHello({ name }: { name: string }) {
  return (
    <button
      className="border p-2"
      onClick={() => alert(`Hello, ${name}`)}
      suppressHydrationWarning //여기에 걸면 hydration error 무시
    >
      Hello, {name} - {Date.now()}
    </button>
  );
}
