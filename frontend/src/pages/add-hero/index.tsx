import {
  Button,
  createToastNotification,
  ImageUploader,
  PageLoader,
  Superpowers,
  TextArea,
  TextInput,
} from '@components/common';
import { FormEvent, MouseEvent, useState } from 'react';
import { ExtFile } from '@dropzone-ui/react';
import { imageToBase64 } from '@helpers';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, DataStatus } from '@common';
import { useAppDispatch, useAppSelector } from '@hooks';
import { heroCreate } from '@store/hero/actions';

export default function () {
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState<ExtFile[]>([]);

  const [nickname, setNickname] = useState('');
  const [real_name, setReal_name] = useState('');
  const [origin_description, setOrigin_description] = useState('');
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [catch_phrase, setCatch_phrase] = useState('');
  const [newSuperPower, setNewSuperPower] = useState<string | null>(null);

  const [isNeedAddSuperpowerForm, setIsNeedAddSuperpowerForm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedImagesBase64: string[] = [];

    for (const { file: image } of selectedImage) {
      if (!image) {
        continue;
      }

      const imageBase64 = await imageToBase64(image);

      selectedImagesBase64.push(imageBase64);
    }

    dispatch(
      heroCreate({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        Images: selectedImagesBase64,
      }),
    )
      .then(() => {
        createToastNotification({ type: 'success', title: 'add hero', message: 'hero added success' });
        navigate(AppRoutes.ROOT);
      })
      .catch((error) => {
        console.error(error);
        createToastNotification({
          type: 'error',
          title: 'add hero error',
          message: error?.message || 'unknow errror',
        });
      });
  };

  const heroesDataStatus = useAppSelector((state) => {
    return state.hero.dataStatus;
  });

  if (heroesDataStatus === DataStatus.PENDING) {
    return <PageLoader />;
  }

  const handleNewSuperPowerSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!newSuperPower) {
      setIsNeedAddSuperpowerForm(false);
      return;
    }

    setSuperpowers((prev) => [...prev, newSuperPower]);
    setIsNeedAddSuperpowerForm(false);
  };

  return (
    <div className={'w-full flex justify-center'}>
      <form className={'flex flex-col justify-center items-center gap-[20px] max-w-[750px]'} onSubmit={handleSubmit}>
        <TextInput
          type={'text'}
          name={'nickname'}
          placeholder={'Iron man'}
          label={'nickname'}
          required={true}
          onChange={(newValue) => setNickname(newValue)}
        />
        <TextInput
          type={'text'}
          name={'real name'}
          label={'real_name'}
          placeholder={'Tony Stark'}
          required={true}
          onChange={(newValue) => setReal_name(newValue)}
        />
        <TextArea
          name={'origin_description'}
          label={'origin_description'}
          placeholder={'this superhero....'}
          className={'min-w-[300px] max-h-[300px]'}
          required={true}
          onChange={(newValue) => setOrigin_description(newValue)}
        />
        <div className={'max-w-[280px]'}>
          <div className={'flex gap-[15px] flex-wrap mb-[15px]'}>
            {superpowers?.map((superpower, index) => (
              <Superpowers key={`${superpower}-${index}`}>{superpower}</Superpowers>
            ))}
          </div>
          {!isNeedAddSuperpowerForm && (
            <Button
              ariaLabel={'add superpower'}
              type={'button'}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsNeedAddSuperpowerForm(true);
              }}
            >
              Add superpower
            </Button>
          )}
          {isNeedAddSuperpowerForm && (
            <div className={'flex flex-col gap-[30px]'}>
              <TextInput
                type={'text'}
                name={'superpowers'}
                label={'superpowers'}
                placeholder={'speed'}
                required={true}
                onChange={(newValue) => setNewSuperPower(newValue)}
              />
              <div className={'flex gap-[30px]'}>
                <Button ariaLabel={'add superpower'} onClick={handleNewSuperPowerSubmit} type={'button'}>
                  Submit
                </Button>
                <Button
                  ariaLabel={'add superpower cancel'}
                  onClick={() => setIsNeedAddSuperpowerForm(false)}
                  type={'button'}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
        <TextInput label={'catch_phrase'} name={'catch_phrase:'} onChange={(newValue) => setCatch_phrase(newValue)} />
        <ImageUploader
          accept={'image/*'}
          maxFileSize={5 * 1024 * 1024}
          maxFiles={100}
          onFileSelect={(file) => {
            setSelectedImage(file);
          }}
        />
        <Button type={'submit'} ariaLabel={'submit button'}>
          Submit
        </Button>
      </form>
    </div>
  );
}
