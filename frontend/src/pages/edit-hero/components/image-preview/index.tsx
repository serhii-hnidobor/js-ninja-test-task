import { IconName } from '@common';
import { Icon } from '@components/common';

interface Props {
  imageSrc: string;
  handleDelete: (src: string) => void;
}

export default function ({ imageSrc, handleDelete }: Props) {
  return (
    <div
      className={'w-[100px] h-[100px] bg-cover bg-no-repeat bg-center relative'}
      style={{ backgroundImage: `url("${imageSrc}")` }}
    >
      <Icon
        name={IconName.TRASH}
        onClick={() => {
          handleDelete(imageSrc);
        }}
        width={25}
        height={25}
        stroke={'blue'}
        className={'cursor-pointer absolute top-[10px] right-[10px]'}
      />
    </div>
  );
}
