#include <emscripten.h>

#include <string.h>

#include "typedef.h"
#include "basic_op.h"
#include "ld8a.h"
#include "dtx.h"
#include "octet.h"

extern Word16 *new_speech;     /* Pointer to new speech data            */
short prm[PRM_SIZE+1];        /* Analysis parameters + frame type      */
short serial[SERIAL_SIZE];    /* Output bitstream buffer               */

short nb_words;
short vad_enable = 0;

short frame = 0;                  /* frame counter */
short count_frame = 0;

//void Init_Pre_Process(void);
EMSCRIPTEN_KEEPALIVE void Js_Init_Pre_Process(void){
    Init_Pre_Process();
}

//void Init_Coder_ld8a(void)
EMSCRIPTEN_KEEPALIVE void Js_Init_Coder_ld8a(void){
    Init_Coder_ld8a();
}

//void Set_zero(Word16 x[],Word16 L)
EMSCRIPTEN_KEEPALIVE void Js_Set_zero(short x[],short L){
    Set_zero(x,L);
}

//void Init_Cod_cng(void)
EMSCRIPTEN_KEEPALIVE void Js_Init_Cod_cng(void){
    Init_Cod_cng();
}

//void Pre_Process(Word16 signal[],Word16 lg);
EMSCRIPTEN_KEEPALIVE void Js_Pre_Process(short signal[],short lg){
    Pre_Process(signal,lg);
}

//void Coder_ld8a(Word16 ana[], Word16 frame, Word16 vad_enable);
EMSCRIPTEN_KEEPALIVE void Js_Coder_ld8a(short ana[], short frame, short vad_enable){
    Coder_ld8a(ana, frame, vad_enable);
}

//void prm2bits_ld8k(Word16 prm[], Word16 bits[]);
EMSCRIPTEN_KEEPALIVE void Js_prm2bits_ld8k(short prm[], short bits[]){
    prm2bits_ld8k(prm, bits);
}
EMSCRIPTEN_KEEPALIVE void Js_Init(void){
  Init_Pre_Process();
  Init_Coder_ld8a();
  Set_zero(prm, PRM_SIZE+1);

  /* for G.729B */
  Init_Cod_cng();
  frame = 0;
  count_frame = 0L;
}

//input 160个字节 output 10个字节
EMSCRIPTEN_KEEPALIVE void Js_Encoder(short input[],char output[]){

    if (frame == 32767) frame = 256;
    else frame++;
    memcpy(new_speech,input,L_FRAME*2);
    Pre_Process(new_speech, L_FRAME);
    Coder_ld8a(prm, frame, vad_enable);
    prm2bits_ld8k( prm, serial);
    nb_words = serial[1] +  (short)2;

    //bit stream to byte array
    char tmp = 0;
    int index = 2;
    int output_index = 0;
    for(int i = 0; i < 10; i++){
        for(int j = 0; j< 8;j++){
            tmp = tmp >> 1;
            if(serial[index] == BIT_1){
                tmp = tmp | 0x80;
            }
            index++;
        }
        output[output_index] = tmp;
        output_index ++;
    }

   // memcpy(output,serial,nb_words*2);
}

//解码
  Word16  de_synth_buf[L_FRAME+M], *de_synth; /* Synthesis                   */
  Word16  de_parm[PRM_SIZE+2];             /* Synthesis parameters        */
  Word16  de_Az_dec[MP1*2];                /* Decoded Az for post-filter  */
  Word16  de_T2[2];                        /* Pitch lag for 2 subframes   */

  Word16  de_Vad;


EMSCRIPTEN_KEEPALIVE void Js_Init_Dcoder(void){
  int i = 0;
  for (i=0; i<M; i++) de_synth_buf[i] = 0;
  de_synth = de_synth_buf + M;
  Init_Decod_ld8a();
  Init_Post_Filter();
  Init_Post_Process();

  /* for G.729b */
  Init_Dec_cng();
}


//input 10个字节，output 160个字节
EMSCRIPTEN_KEEPALIVE void Js_Decoder(char input[],short output[]){
    //输入10个字节，需要先转化出来
    Word16 data[81];
    data[0] = 80;
    int input_index = 0;
    int data_index = 1;
    for(int i = 0; i< 10 ;i++){
        for(int j = 0 ;j<8;j++){
            if((input[input_index] & 0x01) == 1){
                data[data_index] = BIT_1;
            }else{
                data[data_index] = BIT_0;
            }
            input[input_index] = input[input_index] >> 1;
            data_index ++;
        }
    }

    bits2prm_ld8k(data, de_parm);

    de_parm[0] = 0;           /* No frame erasure */

    for (int i=0; i < data[0]; i++){
      if (data[i+1] == 0 ) de_parm[0] = 1;  /* frame erased     */  
    }
        
    if(de_parm[1] == 1) {
        /* check parity and put 1 in parm[5] if parity error */
        de_parm[5] = Check_Parity_Pitch(de_parm[4], de_parm[5]);
    }


    //编解码的缓存要分开

    Decod_ld8a(de_parm, de_synth, de_Az_dec, de_T2, &de_Vad);
    Post_Filter(de_synth, de_Az_dec, de_T2, de_Vad);        /* Post-filter */
    Post_Process(de_synth, L_FRAME);

    memcpy(output,de_synth,L_FRAME*2);
    
}
