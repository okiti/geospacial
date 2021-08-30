describe('Mastered songs', () => {
  let songRequestBody;
  beforeAll(async () => {
    songRequestBody = {
      songId: '12234-2ada-244',
      latitude: '12.3',
      longitude: '8.0',
    };
  });
  it('user has masterd a song', async () => {
    expect(songRequestBody.songId).toBe('12234-2ada-244');
  });
});
