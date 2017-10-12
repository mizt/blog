#include "json.hpp"

#ifdef EMSCRIPTEN 
    #include "Emscripten.h"
#endif

static const int W = 960;
static const int H = 540;
static unsigned int *buffer = new unsigned int[(W+1)*(H+1)];
static double *offset = new double[(W+1)];

// http://stackoverflow.com/questions/1640258/need-a-fast-random-generator-for-c
namespace Math { 
    static unsigned long rand(void) {
        static unsigned long x=123456789, y=362436069, z=521288629;
        x ^= x << 16; x ^= x >> 5; x ^= x << 1; 
        unsigned long t = x; x = y; y = z; z = t^x^y;
        return z;
    }
    static float ranf(void) { return (float)rand()/(float)(~0UL); }
    static float ranfu(void) { return (float)rand()/((~0UL>>1)*1.0)-1.0; }
};

extern "C" {
    
    void setup(const char *json) {
        try {
            int seed = (nlohmann::json::parse(json))["seed"].get<double>();
            seed%=8192;
            for(int k=0; k<seed; k++) Math::rand();
            for(int i=0; i<(H+1)*(W+1); i++) buffer[i] = 0xFF000000|Math::rand();            
        }
        catch(std::exception e) {        
        }
    }
  
    void update(unsigned int *c) {
       
        unsigned int color = (Math::rand()%6!=0)?0xFFFF0000:0xFF00FFFF;

        double step = ((1.5+Math::ranf()*6.0)/(double)(W+1))*((Math::ranf()>0.5)?-1:1);        
        double scale = (0.5-Math::ranf())*(1.6-Math::ranf()*0.8);        
        
        double *o = offset;
        for(int k=0; k<(W+1); k++) *o++ = scale*sin(k*step);
            
        for(int i=1; i<=(H+1); i++) {
            int i2 = (H+1)-i;            
            o = offset;
            for(int j=0; j<(W+1); j++) {
                int i3 = i2+(*o++);
                i3%=(H+1);
                if(i3<0) i3+=(H+1);
                buffer[i3*(W+1)+j]-=buffer[i2*(W+1)+j];
            }
        } 
        
        unsigned int *buff = buffer;
        int len;
        
        for(int i=0; i<H; i++) {
            buff = (buffer+(i+1)*(W+1)+1);
            len = W;
            while(len--) {               
                if((*buff&0xFFFFFF)) {
                    *c++ = 0xFF000000|*buff++;
                }
                else {
                    *buff++ = color;
                    if(!(*c>>24)) *c = color;
                    c++;
                }
            }
        }
        
        buff = buffer;
        len = H+1;
        while(len--) {
            if(!(*buff&0xFFFFFF)) *buff = color;
            buff+=(W+1);
        }
        
        buff = (buffer+(W+1));
        len = W+1;
        while(len--) {
            if(!(*buff&0xFFFFFF)) *buff = color;
            buff++;
        }
    }
}