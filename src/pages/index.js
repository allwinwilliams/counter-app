import Link from 'next/link';
import CounterComponent from '@/components/counter';

export default function Home() {
  return (
    <>
      <h1>Hello counter app!</h1>
      <p>I will be building my counter app here</p>
      <Link href="/cit">
        <button>Go to CIT</button>
      </Link>
      <Link href="/counter">
        <button>Go to Counter</button>
      </Link>
      <CounterComponent initialCount={0} />
    </>
  );
}
