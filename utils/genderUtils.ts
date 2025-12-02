import { Gender } from '@/types/users';

export function formatGender(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return 'Masculino';
    case Gender.FEMALE:
      return 'Feminino';
    default:
      return 'Não informado';
  }
}
