import { getLevel } from '../js/user';
import fetchData from '../js/http';
jest.mock('../js/http');

beforeEach(() => {
    jest.resetAllMocks();
});

test('should call getLevel once', () => {
    fetchData.mockReturnValue(JSON.stringify({}));
    getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('call getLevel with response.status ok', () => {
    const response = {
        status: 'ok',
        level: 10
    };
    fetchData.mockReturnValue(response);
    getLevel(1);
    expect(getLevel(1)).toBe('Ваш текущий уровень: 10');
});

test('call getLevel with response.status not ok', () => {
    const response = {
        status: 'not ok',
        level: 10
    };
    fetchData.mockReturnValue(response);
    getLevel(1);
    expect(getLevel(1)).toBe('Информация об уровне временно недоступна');
});
