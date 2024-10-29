export type Props = {
  error: string;
}

export function ErrorCmp({ error }: Props) {
  return <div>
    <h1>{error}</h1>
  </div>;
}