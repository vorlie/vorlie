// src/components/ClipList.tsx
import React from "react";
import { Clip } from '../data/clipsData';
import ClipItem from './ClipItem';

interface ClipListProps {
  clips: Clip[];
  emptyHeading: string;
}

const ClipList: React.FC<ClipListProps> = ({ clips, emptyHeading }) => {
  const count = clips.length;
  let heading = emptyHeading;

  if (count > 0) {
    const noun = count > 1 ? 'Clips' : 'Clip';
    heading = `${count} ${noun}`;
  }

  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        {heading}
      </h2>
      {count === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          {emptyHeading}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map(clip => (
            <ClipItem key={clip.id} clip={clip} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ClipList;
