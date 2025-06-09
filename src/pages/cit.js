import Link from 'next/link';
import CounterComponent from '@/components/counter';

export default function CitPage() {
    return (
      <>
      <h2>Welcome to CIT</h2>
      <Link href="/">
        <button>Go back</button>
      </Link>
      <CounterComponent initialCount={10}/>
      </>
    );
  }
  