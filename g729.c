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


EMSCRIPTEN_KEEPALIVE void Js_Encoder(short input[],short output[]){
    if (frame == 32767) frame = 256;
    else frame++;
    memcpy(new_speech,input,L_FRAME);
    Pre_Process(new_speech, L_FRAME*2);
    Coder_ld8a(prm, frame, vad_enable);
    prm2bits_ld8k( prm, serial);
    nb_words = serial[1] +  (short)2;
    memcpy(output,serial,nb_words*2);
}
