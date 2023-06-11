import { Button, createToastNotification, ImageUploader, PageLoader, Superpowers, TextInput } from '@components/common';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { ExtFile } from '@dropzone-ui/react';
import axios from 'axios';
import { imageToBase64 } from '@helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes, DataStatus, HeroData } from '@common';
import { ImagePreview } from './components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { heroUpdate } from '@store/hero/actions';

export default function () {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [nickname, setNickname] = useState('');
  const [real_name, setReal_name] = useState('');
  const [origin_description, setOrigin_description] = useState('');
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [catch_phrase, setCatch_phrase] = useState('');
  const [selectedImage, setSelectedImage] = useState<ExtFile[]>([]);
  const [imagesFromDb, setImagesFromDb] = useState<string[]>([]);
  const [newSuperPower, setNewSuperPower] = useState<string | null>(null);

  const [isNeedAddSuperpowerForm, setIsNeedAddSuperpowerForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get<HeroData[]>(`http://localhost:3000/api/heroes/${id}`).then(({ data }) => {
      const { nickname, real_name, origin_description, superpowers, catch_phrase, Images } = data[0];
      setNickname(nickname);
      setReal_name(real_name);
      setOrigin_description(origin_description);
      setSuperpowers(superpowers || []);
      setCatch_phrase(catch_phrase);
      setImagesFromDb(Images || []);
      setIsLoading(false);
    });
  }, [id]);

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
      heroUpdate({
        nickname,
        real_name,
        origin_description,
        superpowers: superpowers,
        catch_phrase,
        Images: [...selectedImagesBase64, ...imagesFromDb],
        id: id as string,
      }),
    )
      .then(() => {
        createToastNotification({ type: 'success', title: 'edit hero', message: 'hero added success' });
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

  if (heroesDataStatus === DataStatus.PENDING || isLoading) {
    return <PageLoader />;
  }

  const handleImgFromDbRemove = (imageSrc: string) => {
    setImagesFromDb((prevValue) => prevValue.filter((src) => src !== imageSrc));
  };

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
          defaultValue={nickname}
          name={'nickname'}
          label={'nickname'}
          placeholder={'Iron man'}
          required={true}
          onChange={(newValue) => setNickname(newValue)}
        />
        <TextInput
          type={'text'}
          defaultValue={real_name}
          name={'real_name'}
          label={'real_name'}
          placeholder={'Tony Stark'}
          required={true}
          onChange={(newValue) => setReal_name(newValue)}
        />
        <TextInput
          defaultValue={origin_description}
          type={'text'}
          name={'origin_description'}
          label={'origin_description'}
          placeholder={'this superhero....'}
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
        <TextInput
          defaultValue={catch_phrase}
          label={'catch_phrase'}
          name={'catch_phrase:'}
          onChange={(newValue) => setCatch_phrase(newValue)}
        />
        <div className={'flex gap-[20px] flex-wrap'}>
          {imagesFromDb.map((src) => (
            <ImagePreview key={`${id}-${src}`} imageSrc={src} handleDelete={handleImgFromDbRemove} />
          ))}
        </div>
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
