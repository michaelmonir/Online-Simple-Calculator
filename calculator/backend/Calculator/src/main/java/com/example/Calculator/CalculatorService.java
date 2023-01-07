package com.example.Calculator;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService
{
    public double add(double d1, double d2)
    {
        double d3 = d1 + d2;
        return d3;
    }
    public double sub(double d1, double d2)
    {
        double d3 = d1 - d2;
        return d3;
    }
    public double mul(double d1, double d2)
    {
        double d3 = d1 * d2;
        return d3;
    }
    public double div(double d1, double d2)
    {
        double d3 = d1 / d2;
        return d3;
    }
    public double percent(double d1)
    {
        double d3 = d1 /100;
        return d3;
    }
    public double reciprocal(double d1)
    {
        double d3 = 1 / d1;
        return d3;
    }
    public double root(double d1)
    {
        double d3 = Math.sqrt(d1);
        return d3;
    }
    public double square(double d1)
    {
        double d3 = d1 * d1;
        return d3;
    }
}
