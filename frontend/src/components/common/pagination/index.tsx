import Pagination from 'rc-pagination/es';
import { Icon } from '@components/common';
import { IconName } from '@common';
import { useWindowDimensions } from '@hooks/use-window-dimensions';

interface Props {
  current: number;
  total: number;
  pageSize: number;
  onChange: (pageNumber: number) => void;
}

export default function ({ current: currentPage, total, pageSize, onChange }: Props) {
  const { screen } = useWindowDimensions();
  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      className={'flex items-center text-white'}
      showLessItems={screen === 'sm' || screen === 'extra-small' || screen === 'xs'}
      jumpNextIcon={
        <Icon className={'mt-[6px]'} name={IconName.THREE_DOTS} color={'white'} stroke={'white'} fill={'white'} />
      }
      jumpPrevIcon={
        <Icon className={'mt-[6px]'} name={IconName.THREE_DOTS} color={'white'} stroke={'white'} fill={'white'} />
      }
      itemRender={(current, type, element) => {
        switch (type) {
          case 'prev':
            return (
              <button className={'w-fit py-0'} style={{ backgroundColor: 'transparent' }}>
                <Icon className={'rotate-180'} name={IconName.RIGHT_ARROW} width={30} height={30} />
              </button>
            );
          case 'next':
            return (
              <button className={'w-fit py-0'} style={{ backgroundColor: 'transparent' }}>
                <Icon name={IconName.RIGHT_ARROW} width={30} height={30} />
              </button>
            );
          case 'page':
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (currentPage === element.props.children) {
              return <button className={'bg-blue px-[15px] py-[7px] text-white'}>{element}</button>;
            }

            return <button style={{ backgroundColor: 'transparent' }}>{element}</button>;
          default:
            return (
              <button
                className={`${
                  current === element ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-400'
                } px-4 py-2 font-bold text-white`}
                style={{ backgroundColor: 'transparent' }}
              >
                {element}
              </button>
            );
        }
      }}
    />
  );
}
